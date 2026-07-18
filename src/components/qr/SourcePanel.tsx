import { useMemo, useState } from "react";

import type { Link } from "@/types/link";
import type { QRMode } from "./types";

interface SourcePanelProps {
  mode: QRMode;
  customUrl: string;

  links: Link[];
  loading: boolean;

  selectedLink: Link | null;

  onSelectLink: (link: Link) => void;
  onModeChange: (mode: QRMode) => void;
  onCustomUrlChange: (value: string) => void;
}

export default function SourcePanel({
  mode,
  customUrl,

  links,
  loading,

  selectedLink,

  onSelectLink,
  onModeChange,
  onCustomUrlChange,
}: SourcePanelProps) {
  const [search, setSearch] = useState("");

  const filteredLinks = useMemo(() => {
    if (!search.trim()) return links;

    const keyword = search.toLowerCase();

    return links.filter(
      (link) =>
        link.slug.toLowerCase().includes(keyword) ||
        link.destination_url.toLowerCase().includes(keyword),
    );
  }, [links, search]);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <h2 className="text-lg font-semibold">Source</h2>

      <p className="mt-1 text-sm text-zinc-500">
        Choose a link or enter a custom URL.
      </p>

      <div className="mt-5 space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={mode === "link"}
            onChange={() => onModeChange("link")}
          />

          <span className="text-sm font-medium">Existing Link</span>
        </label>

        {mode === "link" && (
          <>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search link..."
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
            />

            <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
              {loading && (
                <div className="py-6 text-center text-sm text-zinc-500">
                  Loading...
                </div>
              )}

              {!loading && filteredLinks.length === 0 && (
                <div className="py-6 text-center text-sm text-zinc-500">
                  No links found.
                </div>
              )}

              {filteredLinks.map((link) => {
                let hostname = "";

                try {
                  hostname = new URL(link.destination_url).hostname;
                } catch {
                  hostname = link.destination_url;
                }

                const active = selectedLink?.id === link.id;

                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => onSelectLink(link)}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-zinc-900 bg-zinc-50"
                        : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    <p className="truncate text-sm font-semibold">
                      /{link.slug}
                    </p>

                    <p className="truncate text-xs text-zinc-500">{hostname}</p>
                  </button>
                );
              })}
            </div>
          </>
        )}

        <label className="flex items-center gap-3 pt-2">
          <input
            type="radio"
            checked={mode === "custom"}
            onChange={() => onModeChange("custom")}
          />

          <span className="text-sm font-medium">Custom URL</span>
        </label>

        {mode === "custom" && (
          <input
            type="url"
            value={customUrl}
            onChange={(e) => onCustomUrlChange(e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
          />
        )}
      </div>
    </div>
  );
}
