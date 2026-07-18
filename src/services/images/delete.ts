import { getAccessToken } from "@/lib/auth/client";

export async function deleteImage(id: string) {
  const token = await getAccessToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`/api/images/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.message ?? "Failed to delete image.");
  }

  return response.json();
}
