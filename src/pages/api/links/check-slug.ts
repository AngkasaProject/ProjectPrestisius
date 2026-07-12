import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase/server";

export const GET: APIRoute = async ({ url }) => {
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return Response.json(
      {
        available: false,
        message: "Slug is required",
      },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("links")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return Response.json(
      {
        available: false,
      },
      { status: 500 },
    );
  }

  return Response.json({
    available: !data,
  });
};
