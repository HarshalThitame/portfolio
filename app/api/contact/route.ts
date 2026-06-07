import crypto from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const successMessage = "Thank you for reaching out. I'll get back to you within 24 hours.";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LeadPayload = {
  fullName: string;
  email: string;
  companyName?: string;
  projectType: string;
  budgetRange: string;
  projectDescription: string;
  website?: string;
  startedAt?: number;
};

type LeadErrors = Partial<Record<keyof LeadPayload, string>>;

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 3000) : "";
}

function parseBody(body: Partial<Record<keyof LeadPayload, unknown>>): LeadPayload {
  return {
    fullName: cleanString(body.fullName),
    email: cleanString(body.email).toLowerCase(),
    companyName: cleanString(body.companyName),
    projectType: cleanString(body.projectType),
    budgetRange: cleanString(body.budgetRange),
    projectDescription: cleanString(body.projectDescription),
    website: cleanString(body.website),
    startedAt: typeof body.startedAt === "number" ? body.startedAt : Number(body.startedAt ?? 0),
  };
}

function validateLead(lead: LeadPayload) {
  const errors: LeadErrors = {};

  if (lead.fullName.length < 2) errors.fullName = "Full name is required.";
  if (!emailPattern.test(lead.email)) errors.email = "Enter a valid email address.";
  if (!lead.projectType) errors.projectType = "Select a project type.";
  if (!lead.budgetRange) errors.budgetRange = "Select a budget range.";
  if (lead.projectDescription.length < 10) {
    errors.projectDescription = "Share at least 10 characters about the project.";
  }

  return errors;
}

export async function POST(request: Request) {
  let body: Partial<Record<keyof LeadPayload, unknown>>;

  try {
    body = (await request.json()) as Partial<Record<keyof LeadPayload, unknown>>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const lead = parseBody(body);

  if (lead.website) {
    return NextResponse.json(
      { ok: false, message: "Unable to submit this request." },
      { status: 400 },
    );
  }

  if (lead.startedAt && Date.now() - lead.startedAt < 2500) {
    return NextResponse.json(
      { ok: false, message: "Please review your message and try again." },
      { status: 429 },
    );
  }

  const errors = validateLead(lead);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Please fix the highlighted fields.", errors },
      { status: 422 },
    );
  }

  const record = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    fullName: lead.fullName,
    email: lead.email,
    companyName: lead.companyName || null,
    projectType: lead.projectType,
    budgetRange: lead.budgetRange,
    projectDescription: lead.projectDescription,
    source: "portfolio-contact-form",
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: request.headers.get("user-agent") ?? null,
  };

  try {
    const leadsDirectory = path.join(process.cwd(), "data");
    await mkdir(leadsDirectory, { recursive: true, mode: 0o700 });
    await appendFile(path.join(leadsDirectory, "leads.jsonl"), `${JSON.stringify(record)}\n`, {
      encoding: "utf8",
      mode: 0o600,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again or email directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, message: successMessage });
}
