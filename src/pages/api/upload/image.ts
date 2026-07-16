import type { APIRoute } from "astro";
import { getUserFromRequest } from "@/lib/auth/server";
import { uploadImage } from "@/services/storage";
import { createImage } from "@/services/images";

export const POST: APIRoute = async ({ request }) => {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    const file = formData.get("file");
    const type = formData.get("type");

    if (!(file instanceof File)) {
      return Response.json({ message: "File is required." }, { status: 400 });
    }

    if (type !== "custom-og" && type !== "avatars" && type !== "bio") {
      return Response.json(
        { message: "Invalid upload type." },
        { status: 400 },
      );
    }

    const uploaded = await uploadImage(type, file, user.id);

    const image = await createImage({
      user_id: user.id,
      path: uploaded.path,
      url: uploaded.url,
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
