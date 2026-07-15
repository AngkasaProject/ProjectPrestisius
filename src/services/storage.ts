import { supabase } from "@/lib/supabase/client";
import { v4 as uuid } from "uuid";

export async function uploadOgImage(file: File, userId: string) {
  const extension = file.name.split(".").pop();

  const path = `${userId}/${uuid()}.${extension}`;

  const { error } = await supabase.storage
    .from("custom-og")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage.from("custom-og").getPublicUrl(path);

  return {
    path,
    url: data.publicUrl,
  };
}
export async function deleteOgImage(path: string) {
  const { error } = await supabase.storage.from("custom-og").remove([path]);

  if (error) throw error;
}
export async function replaceOgImage(
  oldPath: string | null,
  file: File,
  userId: string,
) {
  if (oldPath) {
    await deleteOgImage(oldPath);
  }

  return uploadOgImage(file, userId);
}
