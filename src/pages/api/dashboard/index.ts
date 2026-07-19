import type { APIRoute } from "astro";

import { getUserFromRequest } from "@/lib/auth/server";
import { getDashboardStats } from "@/services/dashboard";

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

    // Tetap aman untuk semua role karena data diambil berdasarkan user.id masing-masing
    const dashboard = await getDashboardStats(user.id);

    return Response.json(dashboard);
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
