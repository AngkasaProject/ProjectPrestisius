import type { APIRoute } from "astro";

import { createLink, getLinks, checkSlug } from "@/services/links";

export const GET: APIRoute = async () => {
  try {
    const links = await getLinks();

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
      slug: body.slug,
      destination_url: body.destination_url,
      mode: body.mode ?? "direct",
      status: true,
    });

    return Response.json(link, {
      status: 201,
    });
  } catch {
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
