import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getAccessToken } from "@/lib/auth/client";

import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentLinks from "@/components/dashboard/RecentLinks";

import type { DashboardStats } from "@/services/dashboard";

type Props = {
  origin: string;
};

export default function DashboardPage({ origin }: Props) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const token = await getAccessToken();

        const res = await fetch("/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();

        setStats(data);
      } catch {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="py-12 text-center text-zinc-500">Loading...</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <>
      <StatsGrid stats={stats} />

      <div className="mt-8">
        <RecentLinks links={stats.recentLinks} origin={origin} />
      </div>
    </>
  );
}
