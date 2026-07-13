import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const form = new FormData(e.currentTarget);

    const email = String(form.get("email"));
    const password = String(form.get("password"));

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/admin";

    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log(session);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>

        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="h-12 w-full rounded-xl border border-zinc-200 px-4 outline-none focus:border-zinc-900"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Password</label>

        <input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="h-12 w-full rounded-xl border border-zinc-200 px-4 outline-none focus:border-zinc-900"
        />
      </div>

      <button
        disabled={loading}
        className="flex h-12 w-full items-center justify-center rounded-xl bg-zinc-900 font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Login"}
      </button>

      {message && <p className="text-center text-sm text-red-500">{message}</p>}
    </form>
  );
}
