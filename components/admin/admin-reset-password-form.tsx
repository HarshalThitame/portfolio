"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminResetPasswordForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      if (!configured) throw new Error("Supabase is not configured.");
      if (password.length < 8) throw new Error("Use at least 8 characters.");

      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="admin-auth-card">
      <div className="mb-8">
        <span className="admin-kicker">Security</span>
        <h1>Create new password</h1>
        <p>Enter a new password after opening the reset link from your email.</p>
      </div>

      <label>
        New password
        <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </label>

      {status ? <div className="admin-auth-alert">{status}</div> : null}

      <Button type="submit" disabled={isLoading || !configured} className="w-full">
        {isLoading ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
