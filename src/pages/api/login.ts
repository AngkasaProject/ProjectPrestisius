import type { APIRoute } from "astro";
import { serialize } from "cookie-es";
import { supabase } from "@/lib/supabase/server";
import { verifyPassword } from "@/lib/auth/password";

export const POST: APIRoute = async ({ request }) => {
  let body;

  try {
    body = await request.json();
  } catch {
    return new Response("Request body kosong", { status: 400 });
  }

  const { email, password } = body;

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) {
    return new Response("Email atau password salah", { status: 401 });
  }

  const valid = await verifyPassword(password, user.password);

  if (!valid) {
    return new Response("Email atau password salah", { status: 401 });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": serialize("admin_session", user.id, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: import.meta.env.PROD,
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  });
};
