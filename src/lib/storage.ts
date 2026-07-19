/**
 * Helper untuk mengubah path mentah R2 menjadi URL publik utuh.
 */
export function getStorageUrl(path: string | null | undefined): string {
  if (!path) return "";

  // Jika data lama Supabase yang berbentuk URL penuh, langsung kembalikan
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Ambil URL R2 dari env
  const r2Url = import.meta.env.PUBLIC_R2_URL;

  // Pastikan path bersih dari slash di awal untuk standarisasi
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  if (!r2Url || r2Url.trim() === "") {
    // Mode localhost: Paksa menggunakan absolute path '/' di awal agar tidak relatif terhadap halaman dashboard
    return `/${cleanPath}`;
  }

  const cleanUrl = r2Url.endsWith("/") ? r2Url.slice(0, -1) : r2Url;
  return `${cleanUrl}/${cleanPath}`;
}
