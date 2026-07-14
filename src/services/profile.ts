import { supabase } from "@/lib/supabase/server";

export async function createProfileIfNotExists(user: {
  id: string;
  email?: string;
}) {
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (data) return;

  const username =
    user.email?.split("@")[0].toLowerCase() ?? `user_${user.id.slice(0, 8)}`;

  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    username,
  });

  if (error) throw error;
}
