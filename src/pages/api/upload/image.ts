import type { APIRoute } from "astro";
import { getUserFromRequest } from "@/lib/auth/server";
import { createImage } from "@/services/images";
// Menggunakan cara resmi runtime Astro modern untuk platform Cloudflare
import { env } from "cloudflare:workers";

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Validasi Autentikasi User
    const user = await getUserFromRequest(request);
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const type = formData.get("type"); // custom-og

    // 2. Validasi Input File
    if (!(file instanceof File)) {
      return Response.json({ message: "File is required." }, { status: 400 });
    }

    if (type !== "custom-og" && type !== "avatars" && type !== "bio") {
      return Response.json(
        { message: "Invalid upload type." },
        { status: 400 },
      );
    }

    // 3. Ambil R2 Binding menggunakan standar terbaru Cloudflare Workers
    // @ts-ignore - mengabaikan warning kecocokan types saat kompilasi lokal jika diperlukan
    const bucket = env.R2; // Mengambil variabel "R2" dari wrangler.jsonc

    if (!bucket) {
      return Response.json(
        { message: "R2 bucket binding tidak ditemukan di env." },
        { status: 500 },
      );
    }

    // 4. Buat Jalur Path (File Key) Unik Terstruktur
    const fileExtension = file.name.split(".").pop();
    const uniqueId = Math.random().toString(36).substring(2, 7);
    const fileKey = `${type}/${user.id}/${Date.now()}-${uniqueId}.${fileExtension}`;

    // 5. Eksekusi Upload ke Cloudflare R2 secara Native
    await bucket.put(fileKey, file.stream(), {
      httpMetadata: {
        contentType: file.type,
        cacheControl: "public, max-age=31536000",
      },
    });

    // 6. Simpan Metadata ke Database Supabase Anda
    const image = await createImage({
      user_id: user.id,
      path: fileKey,
      url: fileKey,
      filename: file.name,
      mime_type: file.type,
      size: file.size,
    });

    return Response.json(image);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: error instanceof Error ? error.message : "Upload failed.",
      },
      {
        status: 500,
      },
    );
  }
};
