import { getAccessToken } from "@/lib/auth/client";
import { uploadImageRequest } from "@/services/upload";

type Params = {
  id: string;

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
  ogImageId: string | null;

  // URL lama di database
  currentOgImageUrl: string | null;
};

export async function updateLink({
  id,
  slug,
  destination,
  mode,
  status,
  ogMode,
  ogTitle,
  ogDescription,
  ogImage,
  ogImageUrl,
  ogImageId,
  currentOgImageUrl,
}: Params) {
  const token = await getAccessToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  let finalImageUrl = ogImageUrl ?? currentOgImageUrl;
  let finalImageId = ogImageId;

  // Upload hanya jika user memilih file baru
  if (ogMode === "custom" && ogImage) {
    const uploaded = await uploadImageRequest(ogImage, "custom-og", token);

    finalImageUrl = uploaded.url;
    finalImageId = uploaded.id;
  }

  const res = await fetch(`/api/links/${id}`, {
    method: "PATCH",

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
      og_image_id: finalImageId,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}
