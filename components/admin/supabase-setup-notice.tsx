import { Database, KeyRound } from "lucide-react";

export function SupabaseSetupNotice() {
  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <span className="admin-kicker">Setup Required</span>
        <h1>Connect Supabase first</h1>
        <p>
          Add your Supabase URL, anon key, and service role key to `.env.local`
          and Vercel environment variables before opening the private admin panel.
        </p>
        <div className="admin-setup-list">
          <span>
            <Database className="size-4" />
            NEXT_PUBLIC_SUPABASE_URL
          </span>
          <span>
            <KeyRound className="size-4" />
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </span>
          <span>
            <KeyRound className="size-4" />
            SUPABASE_SERVICE_ROLE_KEY
          </span>
        </div>
      </section>
    </main>
  );
}
