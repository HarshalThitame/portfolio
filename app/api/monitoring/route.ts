import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (process.env.NODE_ENV === "development") {
      console.info("[monitoring]", payload);
    }

    return new Response(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Invalid monitoring payload" }, { status: 400 });
  }
}
