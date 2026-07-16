export async function checkSlug(slug: string) {
  const res = await fetch(
    `/api/links/check-slug?slug=${encodeURIComponent(slug)}`,
  );

  if (!res.ok) {
    throw new Error("Failed to check slug.");
  }

  return res.json() as Promise<{
    available: boolean;
  }>;
}
