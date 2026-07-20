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

/* ========================================================= */

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function updateProfile(
  userId: string,
  payload: {
    username: string;
    full_name: string;
    bio: string;
    website: string;
    avatar_url: string | null;
  },
) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function checkUsername(username: string, currentUserId: string) {
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .neq("id", currentUserId)
    .maybeSingle();

  return !data;
}
