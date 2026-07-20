import type { APIRoute } from "astro";

import { getUserFromRequest } from "@/lib/auth/server";

import { getProfile, updateProfile, checkUsername } from "@/services/profile";

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

    const profile = await getProfile(user.id);

    return Response.json(profile);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to fetch profile",
      },
      {
        status: 500,
      },
    );
  }
};

export const PUT: APIRoute = async ({ request }) => {
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

    type UpdateProfileBody = {
      username: string;
      full_name?: string;
      bio?: string;
      website?: string;
      avatar_url?: string | null;
    };

    const body = (await request.json()) as UpdateProfileBody;

    if (!body.username?.trim()) {
      return Response.json(
        {
          message: "Username is required",
        },
        {
          status: 400,
        },
      );
    }

    const available = await checkUsername(body.username.trim(), user.id);

    if (!available) {
      return Response.json(
        {
          message: "Username already exists",
        },
        {
          status: 409,
        },
      );
    }

    const profile = await updateProfile(user.id, {
      username: body.username.trim(),
      full_name: body.full_name ?? "",
      bio: body.bio ?? "",
      website: body.website ?? "",
      avatar_url: body.avatar_url ?? null,
    });

    return Response.json(profile);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to update profile",
      },
      {
        status: 500,
      },
    );
  }
};
