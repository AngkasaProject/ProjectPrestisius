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
  og_image_id: string | null;
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
    og_image_id: string | null;
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

export async function deleteLink(id: string, env?: any) {
  const { data: link, error: fetchError } = await supabase
    .from("links")
    .select("og_image_id")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;

  const { error: deleteError } = await supabase
    .from("links")
    .delete()
    .eq("id", id);

  if (deleteError) throw deleteError;

  if (link?.og_image_id) {
    const { count, error: countError } = await supabase
      .from("links")
      .select("*", { count: "exact", head: true })
      .eq("og_image_id", link.og_image_id);

    if (countError) throw countError;

    if (count === 0) {
      const { data: image, error: imageError } = await supabase
        .from("images")
        .select("path")
        .eq("id", link.og_image_id)
        .single();

      if (imageError) throw imageError;

      if (image?.path && env?.R2) {
        await env.R2.delete(image.path);
      }

      const { error: imageDeleteError } = await supabase
        .from("images")
        .delete()
        .eq("id", link.og_image_id);

      if (imageDeleteError) throw imageDeleteError;
    }
  }
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
