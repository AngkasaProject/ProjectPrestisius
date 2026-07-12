import type { APIRoute } from "astro";

import {
  getLinkById,
  updateLink,
  deleteLink,
  checkSlug,
  updateLinkStatus,
} from "@/services/links";

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = params.id;

    if (!id) {
      return Response.json({ message: "Missing id" }, { status: 400 });
    }

    const link = await getLinkById(id);

    return Response.json(link);
  } catch {
    return Response.json({ message: "Link not found" }, { status: 404 });
  }
};

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const id = params.id;

    if (!id) {
      return Response.json({ message: "Missing id" }, { status: 400 });
    }

    const body = await request.json();

    if (typeof body.status === "boolean") {
      const updated = await updateLinkStatus(id, body.status);

      return Response.json(updated);
    }

    const current = await getLinkById(id);

    if (body.slug !== current.slug) {
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
    }

    const updated = await updateLink(id, {
      slug: body.slug,
      destination_url: body.destination_url,
      mode: body.mode,
      status: body.status,
    });

    return Response.json(updated);
  } catch {
    return Response.json({ message: "Failed to update" }, { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = params.id;

    if (!id) {
      return Response.json({ message: "Missing id" }, { status: 400 });
    }

    await deleteLink(id);

    return Response.json({
      success: true,
    });
  } catch {
    return Response.json({ message: "Failed to delete" }, { status: 500 });
  }
};
