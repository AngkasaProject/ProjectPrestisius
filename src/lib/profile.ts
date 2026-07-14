import { supabase } from "@/lib/supabase/client";

export async function ensureProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (data) return;

  await supabase.from("profiles").insert({
    id: user.id,
    username: user.email?.split("@")[0] ?? `user-${user.id.slice(0, 8)}`,
  });
}
