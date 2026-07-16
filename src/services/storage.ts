import { supabaseAdmin } from "@/lib/supabase/admin";
import { v4 as uuid } from "uuid";

export type UploadFolder = "custom-og" | "avatars" | "bio";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;

const MAX_SIZE = 1 * 1024 * 1024;

export async function uploadImage(
  folder: UploadFolder,
  file: File,
  userId: string,
) {
  if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
    throw new Error("Unsupported image format.");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("Maximum image size is 5 MB.");
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "webp";

  const path = `${folder}/${userId}/${uuid()}.${extension}`;

  const { error } = await supabaseAdmin.storage
    .from("assets")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabaseAdmin.storage.from("assets").getPublicUrl(path);

  return {
    path,
    url: data.publicUrl,
  };
}

export async function deleteImage(path: string) {
  const { error } = await supabaseAdmin.storage.from("assets").remove([path]);

  if (error) {
    throw error;
  }
}

export async function replaceImage(
  folder: UploadFolder,
  oldPath: string | null,
  file: File,
  userId: string,
) {
  if (oldPath) {
    await deleteImage(oldPath);
  }

  return uploadImage(folder, file, userId);
}
