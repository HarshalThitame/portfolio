import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const supabase = createSupabaseServiceClient();

    if (process.env.NODE_ENV === "development") {
      console.info("[monitoring]", payload);
    }

    if (supabase && typeof payload?.type === "string") {
      await supabase.from("analytics_events").insert({
        event_name: payload.type,
        page_path: typeof payload.path === "string" ? payload.path : null,
        source: typeof payload.name === "string" ? payload.name : "web-vitals",
        metadata: payload,
      });
    }

    return new Response(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Invalid monitoring payload" }, { status: 400 });
  }
}
