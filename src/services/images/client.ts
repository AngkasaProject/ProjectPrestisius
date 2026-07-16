import { getAccessToken } from "@/lib/auth/client";

export async function getMyImages() {
  const token = await getAccessToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch("/api/images", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const json = await response.json();

    throw new Error(json.message ?? "Failed to load images.");
  }

  return response.json();
}
