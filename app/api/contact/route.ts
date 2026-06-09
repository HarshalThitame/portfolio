import crypto from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const successMessage = "Thank you for reaching out. I'll get back to you within 24 hours.";
const emailNotConfiguredMessage =
  "Thank you for reaching out. Your inquiry was saved, but email delivery is not configured yet.";
const emailFailedMessage =
  "Your inquiry was received, but email delivery failed. Please email directly or message on WhatsApp.";
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

type LeadRecord = {
  id: string;
  submittedAt: string;
  fullName: string;
  email: string;
  companyName: string | null;
  projectType: string;
  budgetRange: string;
  projectDescription: string;
  source: string;
  ip: string | null;
  userAgent: string | null;
};

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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatLeadText(record: LeadRecord) {
  return [
    `New portfolio inquiry from ${record.fullName}`,
    "",
    `Name: ${record.fullName}`,
    `Email: ${record.email}`,
    `Company: ${record.companyName ?? "Not provided"}`,
    `Project Type: ${record.projectType}`,
    `Budget Range: ${record.budgetRange}`,
    `Submitted At: ${record.submittedAt}`,
    "",
    "Project Description:",
    record.projectDescription,
    "",
    `Source: ${record.source}`,
    `IP: ${record.ip ?? "Unknown"}`,
  ].join("\n");
}

function formatLeadHtml(record: LeadRecord) {
  const rows = [
    ["Name", record.fullName],
    ["Email", record.email],
    ["Company", record.companyName ?? "Not provided"],
    ["Project Type", record.projectType],
    ["Budget Range", record.budgetRange],
    ["Submitted At", record.submittedAt],
    ["Source", record.source],
  ];

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#05060a;color:#f8fbff;padding:32px;border-radius:20px;">
      <p style="margin:0 0 12px;color:#61f4ff;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Portfolio Inquiry</p>
      <h1 style="margin:0 0 24px;font-size:28px;line-height:1.15;">New project inquiry from ${escapeHtml(record.fullName)}</h1>
      <div style="border:1px solid rgba(255,255,255,.12);border-radius:16px;overflow:hidden;">
        ${rows
          .map(
            ([label, value]) => `
              <div style="display:grid;grid-template-columns:150px 1fr;border-bottom:1px solid rgba(255,255,255,.08);">
                <div style="padding:14px 16px;color:rgba(248,251,255,.58);font-size:13px;">${escapeHtml(label)}</div>
                <div style="padding:14px 16px;font-size:14px;">${escapeHtml(value)}</div>
              </div>
            `,
          )
          .join("")}
      </div>
      <div style="margin-top:22px;padding:18px;border:1px solid rgba(97,244,255,.22);border-radius:16px;background:rgba(97,244,255,.06);">
        <p style="margin:0 0 8px;color:rgba(248,251,255,.62);font-size:13px;">Project Description</p>
        <p style="margin:0;color:#f8fbff;line-height:1.65;">${escapeHtml(record.projectDescription).replaceAll("\n", "<br />")}</p>
      </div>
    </div>
  `;
}

async function saveLeadBackup(record: LeadRecord) {
  try {
    const leadsDirectory = path.join(process.cwd(), "data");
    await mkdir(leadsDirectory, { recursive: true, mode: 0o700 });
    await appendFile(path.join(leadsDirectory, "leads.jsonl"), `${JSON.stringify(record)}\n`, {
      encoding: "utf8",
      mode: 0o600,
    });
  } catch (error) {
    console.error("Failed to save local lead backup", error);
  }
}

async function saveLeadToSupabase(record: LeadRecord) {
  const supabase = createSupabaseServiceClient();

  if (!supabase) return;

  const { data: message, error: messageError } = await supabase
    .from("contact_messages")
    .insert({
      full_name: record.fullName,
      email: record.email,
      company_name: record.companyName,
      project_type: record.projectType,
      budget_range: record.budgetRange,
      message: record.projectDescription,
      source: record.source,
      ip: record.ip,
      user_agent: record.userAgent,
      metadata: {
        localId: record.id,
        submittedAt: record.submittedAt,
      },
    })
    .select("id")
    .single();

  if (messageError) {
    console.error("Failed to save contact message to Supabase", messageError);
    return;
  }

  const { error: leadError } = await supabase.from("leads").insert({
    contact_message_id: message.id,
    full_name: record.fullName,
    email: record.email,
    company_name: record.companyName,
    project_type: record.projectType,
    budget_range: record.budgetRange,
    message: record.projectDescription,
    status: "new",
  });

  if (leadError) {
    console.error("Failed to save lead to Supabase", leadError);
  }
}

async function sendLeadEmail(record: LeadRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Harshal Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to || !from) {
    return { configured: false };
  }

  const recipients = to
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    return { configured: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": record.id,
    },
    body: JSON.stringify({
      from,
      to: recipients,
      reply_to: record.email,
      subject: `New portfolio inquiry from ${record.fullName}`,
      text: formatLeadText(record),
      html: formatLeadHtml(record),
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Resend email failed with ${response.status}: ${details}`);
  }

  return { configured: true };
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

  await Promise.all([saveLeadBackup(record), saveLeadToSupabase(record)]);

  try {
    const emailResult = await sendLeadEmail(record);

    return NextResponse.json({
      ok: true,
      message: emailResult.configured ? successMessage : emailNotConfiguredMessage,
    });
  } catch (error) {
    console.error("Failed to send contact email", error);

    return NextResponse.json(
      { ok: false, message: emailFailedMessage },
      { status: 502 },
    );
  }
}
