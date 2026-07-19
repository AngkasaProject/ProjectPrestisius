import { supabase } from "@/lib/supabase/server";
import { getStorageUrl } from "@/lib/storage";

interface DatabaseImage {
  id: string;
  user_id: string;
  path: string;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  created_at: string;
}

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

  if (!data) return [];

  return (data as DatabaseImage[]).map((image) => {
    return {
      ...image,
      url: getStorageUrl(image.path || image.url),
    };
  });
}

export async function getImageById(id: string) {
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function imageIsUsed(id: string) {
  const { data, error } = await supabase
    .from("links")
    .select("id")
    .eq("og_image_id", id)
    .limit(1);

  if (error) throw error;

  return (data?.length ?? 0) > 0;
}

export async function deleteImage(id: string, userId: string) {
  const image = await getImageById(id);

  if (!image) {
    throw new Error("Image not found.");
  }

  if (image.user_id !== userId) {
    throw new Error("Forbidden.");
  }

  if (await imageIsUsed(id)) {
    throw new Error("This image is currently used by one or more links.");
  }

  const { error } = await supabase.from("images").delete().eq("id", id);

  if (error) throw error;
}
