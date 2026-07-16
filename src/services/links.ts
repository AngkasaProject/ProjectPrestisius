import { supabase } from "@/lib/supabase/server";
import type { Link } from "@/types/link";

export async function getLinks(userId: string): Promise<Link[]> {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

type CreateLinkPayload = {
  user_id: string;
  slug: string;
  destination_url: string;
  mode: "direct" | "flow";
  status: boolean;

  og_mode: "destination" | "custom";
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
};

export async function createLink(payload: CreateLinkPayload) {
  const { data, error } = await supabase
    .from("links")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function checkSlug(slug: string) {
  const { data } = await supabase
    .from("links")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  return !data;
}

export async function getLinkById(id: string) {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateLink(
  id: string,
  payload: {
    slug: string;
    destination_url: string;
    mode: "direct" | "flow";
    status: boolean;

    og_mode: "destination" | "custom";
    og_title: string | null;
    og_description: string | null;
    og_image_url: string | null;
  },
) {
  const { data, error } = await supabase
    .from("links")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteLink(id: string) {
  const { error } = await supabase.from("links").delete().eq("id", id);

  if (error) throw error;
}
export async function updateLinkStatus(id: string, status: boolean) {
  const { data, error } = await supabase
    .from("links")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
