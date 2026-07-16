import type { APIRoute } from "astro";
import { getUserFromRequest } from "@/lib/auth/server";
import { createLink, getLinks, checkSlug } from "@/services/links";

export const GET: APIRoute = async ({ request }) => {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const links = await getLinks(user.id);

    return Response.json(links);
  } catch {
    return Response.json(
      {
        message: "Failed to fetch links",
      },
      {
        status: 500,
      },
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const user = await getUserFromRequest(request);

    if (!user) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    if (!body.slug) {
      return Response.json(
        {
          message: "Short Link is required",
        },
        {
          status: 400,
        },
      );
    }

    if (!body.destination_url) {
      return Response.json(
        {
          message: "Destination URL is required",
        },
        {
          status: 400,
        },
      );
    }

    const available = await checkSlug(body.slug);

    if (!available) {
      return Response.json(
        {
          message: "Short Link already exists",
        },
        {
          status: 409,
        },
      );
    }

    const link = await createLink({
      user_id: user.id,
      slug: body.slug,
      destination_url: body.destination_url,
      mode: body.mode ?? "direct",
      status: true,

      og_mode: body.og_mode ?? "destination",
      og_title: body.og_title ?? null,
      og_description: body.og_description ?? null,
      og_image_url: body.og_image_url ?? null,
    });

    return Response.json(link, {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
};
