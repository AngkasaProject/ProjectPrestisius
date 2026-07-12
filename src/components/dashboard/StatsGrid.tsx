import { Link2, CheckCircle2, XCircle, MousePointerClick } from "lucide-react";

import type { DashboardStats } from "@/services/dashboard";

import StatsCard from "./StatsCard";

type Props = {
  stats: DashboardStats;
};

export default function StatsGrid({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatsCard
        title="Total Links"
        value={stats.totalLinks}
        icon={<Link2 size={22} />}
      />

      <StatsCard
        title="Active"
        value={stats.activeLinks}
        icon={<CheckCircle2 size={22} />}
      />

      <StatsCard
        title="Inactive"
        value={stats.inactiveLinks}
        icon={<XCircle size={22} />}
      />

      <StatsCard
        title="Clicks"
        value={stats.totalClicks}
        icon={<MousePointerClick size={22} />}
      />
    </div>
  );
}
