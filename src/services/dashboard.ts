import { supabase } from "@/lib/supabase/server";
import type { Link } from "@/types/link";

export type DashboardStats = {
  totalLinks: number;
  activeLinks: number;
  inactiveLinks: number;
  totalClicks: number;
  recentLinks: Link[];
};

export async function getDashboardStats(
  userId: string,
): Promise<DashboardStats> {
  const { data: links, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const totalLinks = links.length;

  const activeLinks = links.filter((link) => link.status).length;

  const inactiveLinks = totalLinks - activeLinks;

  const totalClicks = links.reduce(
    (total, link) => total + (link.clicks ?? 0),
    0,
  );

  const recentLinks = links.slice(0, 5);

  return {
    totalLinks,
    activeLinks,
    inactiveLinks,
    totalClicks,
    recentLinks,
  };
}
