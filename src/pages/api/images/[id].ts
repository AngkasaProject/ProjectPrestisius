import type { APIRoute } from "astro";
import { getUserFromRequest } from "@/lib/auth/server";
import { deleteImage, getImageById } from "@/services/images";
import { env } from "cloudflare:workers";

export const DELETE: APIRoute = async ({ request, params }) => {
  try {
    // 1. Validasi Autentikasi User
    const user = await getUserFromRequest(request);
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    if (!id) {
      return Response.json(
        { message: "Image id is required." },
        { status: 400 },
      );
    }

    // 2. Ambil data gambar terlebih dahulu untuk mendapatkan string path R2-nya
    const image = await getImageById(id);
    if (!image) {
      return Response.json({ message: "Image not found." }, { status: 404 });
    }

    // 3. Jalankan logika penghapusan database (dan pengecekan aturan bisnis di level service)
    await deleteImage(id, user.id);

    // 4. Jika hapus DB sukses, hapus file fisiknya dari Cloudflare R2
    const bucket = env.R2; // Mengambil variabel "R2" dari wrangler.jsonc
    if (bucket && image.path) {
      await bucket.delete(image.path);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      switch (error.message) {
        case "Image not found.":
          return Response.json({ message: error.message }, { status: 404 });
        case "Forbidden.":
          return Response.json({ message: error.message }, { status: 403 });
        case "This image is currently used by one or more links.":
          return Response.json({ message: error.message }, { status: 409 });
      }
    }

    return Response.json(
      { message: "Failed to delete image." },
      { status: 500 },
    );
  }
};
