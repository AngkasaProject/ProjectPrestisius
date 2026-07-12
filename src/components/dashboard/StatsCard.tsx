import type { ReactNode } from "react";

type Props = {
  title: string;
  value: number | string;
  icon: ReactNode;
};

export default function StatsCard({ title, value, icon }: Props) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-zinc-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">{title}</p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            {typeof value === "number" ? value.toLocaleString() : value}
          </h2>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-zinc-100
            text-zinc-700
            transition
            group-hover:bg-zinc-900
            group-hover:text-white
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
