"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("harshal.dev.work@gmail.com");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(searchParams.get("error") === "not-approved" ? "This account is not approved as an admin yet." : null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!configured) {
      setStatus("Supabase is not configured. Add the required environment variables first.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();

      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/admin/reset-password`,
        });

        if (error) throw error;
        setStatus("Password reset email sent.");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="admin-auth-card">
      <div className="mb-8">
        <span className="admin-kicker">Private CMS</span>
        <h1>{mode === "login" ? "Sign in to Admin" : "Reset password"}</h1>
        <p>
          Manage portfolio content, projects, leads, blog posts, SEO, media,
          and analytics from one protected dashboard.
        </p>
      </div>

      <label>
        Email
        <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>

      {mode === "login" ? (
        <label>
          Password
          <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
      ) : null}

      {status ? (
        <div className="admin-auth-alert">
          <AlertCircle className="size-4" />
          {status}
        </div>
      ) : null}

      <Button type="submit" disabled={isLoading || !configured} className="w-full">
        {isLoading ? "Working..." : mode === "login" ? "Sign In" : "Send Reset Link"}
        {mode === "login" ? <ArrowRight className="size-4" /> : <Mail className="size-4" />}
      </Button>

      <button
        type="button"
        className="admin-auth-link"
        onClick={() => {
          setStatus(null);
          setMode(mode === "login" ? "forgot" : "login");
        }}
      >
        {mode === "login" ? "Forgot password?" : "Back to login"}
      </button>
    </form>
  );
}
