import type { APIRoute } from "astro";
import { getUserFromRequest } from "@/lib/auth/server";
import { getUserImages } from "@/services/images";

export const GET: APIRoute = async ({ request }) => {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const images = await getUserImages(user.id);

    return Response.json(images);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to load images.",
      },
      {
        status: 500,
      },
    );
  }
};
