import { ExternalLink } from "lucide-react";
import type { Link } from "@/types/link";

type Props = {
  links: Link[];
  origin: string;
};

export default function RecentLinks({ links, origin }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold">Recent Links</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Latest created short links
          </p>
        </div>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
          {links.length}
        </span>
      </div>

      {links.length === 0 ? (
        <div className="py-14 text-center">
          <p className="font-medium text-zinc-700">No links yet</p>

          <p className="mt-1 text-sm text-zinc-500">
            Create your first short link.
          </p>
        </div>
      ) : (
        <div>
          {links.map((link) => (
            <div
              key={link.id}
              className="
                flex
                items-center
                justify-between
                gap-4
                border-b
                border-zinc-100
                px-6
                py-5
                transition
                hover:bg-zinc-50
                last:border-0
              "
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-zinc-900">
                  {link.slug}
                </p>

                <p className="mt-1 truncate text-sm text-zinc-500">
                  {origin}/{link.slug}
                </p>

                <p className="mt-2 truncate text-sm text-zinc-400">
                  {link.destination_url}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-lg font-bold">
                    {link.clicks.toLocaleString()}
                  </p>

                  <p className="text-xs text-zinc-500">Clicks</p>
                </div>

                <a
                  href={`/${link.slug}`}
                  target="_blank"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-zinc-200
                    transition
                    hover:bg-zinc-900
                    hover:text-white
                  "
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
