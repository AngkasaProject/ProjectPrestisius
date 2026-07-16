import { getAccessToken } from "@/lib/auth/client";
import { uploadImageRequest } from "@/services/upload";

type Params = {
  slug: string;
  destination: string;
  mode: "direct" | "flow";
  status: boolean;

  ogMode: "destination" | "custom";
  ogTitle: string;
  ogDescription: string;

  // Upload baru
  ogImage: File | null;

  // Dipilih dari Media Library
  ogImageUrl: string | null;
};

export async function createLink({
  slug,
  destination,
  mode,
  status,
  ogMode,
  ogTitle,
  ogDescription,
  ogImage,
  ogImageUrl,
}: Params) {
  const token = await getAccessToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  let finalImageUrl = ogImageUrl;

  // Upload hanya jika user memilih file baru
  if (ogMode === "custom" && ogImage) {
    const uploaded = await uploadImageRequest(ogImage, "custom-og", token);

    finalImageUrl = uploaded.url;
  }

  const res = await fetch("/api/links", {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      slug,
      destination_url: destination,
      mode,
      status,

      og_mode: ogMode,
      og_title: ogTitle,
      og_description: ogDescription,
      og_image_url: finalImageUrl,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}
