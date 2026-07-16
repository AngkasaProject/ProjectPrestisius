import { supabase } from "@/lib/supabase/server";

export async function createImage(payload: {
  user_id: string;
  path: string;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
}) {
  const { data, error } = await supabase
    .from("images")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getUserImages(userId: string) {
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data ?? [];
}
