export type UploadType = "custom-og" | "avatars" | "bio";

export async function uploadImageRequest(
  file: File,
  type: UploadType,
  token: string,
) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("type", type);

  const res = await fetch("/api/upload/image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json as {
    id: string;
    path: string;
    url: string;
  };
}
