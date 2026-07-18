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

    // Toggle status
    if (Object.keys(body).length === 1 && typeof body.status === "boolean") {
      const updated = await updateLinkStatus(id, body.status);

      return Response.json(updated);
    }

    const current = await getLinkById(id);

    if (!current) {
      return Response.json({ message: "Link not found" }, { status: 404 });
    }

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

      og_mode: body.og_mode ?? "destination",
      og_title: body.og_title ?? null,
      og_description: body.og_description ?? null,
      og_image_url: body.og_image_url ?? null,
      og_image_id: body.og_image_id ?? null,
    });

    return Response.json(updated);
  } catch (error) {
    console.error(error);

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
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Failed to delete" }, { status: 500 });
  }
};
