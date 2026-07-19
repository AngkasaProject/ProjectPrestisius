import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export async function getUserFromRequest(request: Request) {
  const auth = request.headers.get("authorization");

  if (!auth?.startsWith("Bearer ")) {
    return null;
  }

  const token = auth.replace("Bearer ", "");

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) return null;

  // Ambil data role dari tabel profiles berdasarkan user.id
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // Jika profile tidak ketemu atau ada error, kita berikan default role 'user' demi keamanan
  const role = !profileError && profile ? profile.role : "user";

  // Kembalikan objek user bawaan Supabase, dibundel dengan property role baru
  return {
    ...user,
    role: role as "user" | "admin",
  };
}
