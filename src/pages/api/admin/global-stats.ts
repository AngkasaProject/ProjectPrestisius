import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase/client";

export const GET: APIRoute = async ({ request }) => {
  try {
    const { data: usersData, error } = await supabase
      .from("profiles")
      .select(
        `
        id,
        full_name,
        role,
        status,
        created_at,
        links (count)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    const formattedUsers = usersData.map((user: any) => ({
      id: user.id,
      fullName: user.full_name || "User",
      role: user.role || "user",
      status: user.status || "active",
      createdAt: new Date(user.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      totalLinks: user.links?.[0]?.count || 0,
    }));

    return new Response(JSON.stringify({ users: formattedUsers }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
