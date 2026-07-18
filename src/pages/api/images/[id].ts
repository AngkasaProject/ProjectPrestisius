import type { APIRoute } from "astro";
import { getUserFromRequest } from "@/lib/auth/server";
import { deleteImage } from "@/services/images";

export const DELETE: APIRoute = async ({ request, params }) => {
  try {
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

    await deleteImage(id, user.id);

    return Response.json({
      success: true,
    });
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
      {
        message: "Failed to delete image.",
      },
      {
        status: 500,
      },
    );
  }
};
