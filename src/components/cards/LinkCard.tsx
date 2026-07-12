import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Link2,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Link } from "@/types/link";

import Switch from "@/components/ui/Switch";
import DeleteDialog from "@/components/dialogs/DeleteDialog";

import { copy } from "@/lib/copy";

type Props = {
  link: Link;
  origin: string;
};

export default function LinkCard({ link, origin }: Props) {
  const [status, setStatus] = useState(link.status);

  const [copied, setCopied] = useState(false);

  const [updated, setUpdated] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [showDestination, setShowDestination] = useState(false);

  async function handleCopy() {
    const ok = await copy(`${origin}/${link.slug}`);

    if (!ok) return;

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  async function handleToggle(value: boolean) {
    try {
      const res = await fetch(`/api/links/${link.id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status: value,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      setStatus(value);

      setUpdated(true);

      setTimeout(() => {
        setUpdated(false);
      }, 1500);
    } catch {}
  }

  async function handleDelete() {
    try {
      const res = await fetch(`/api/links/${link.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      location.reload();
    } catch {}
  }

  return (
    <>
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        {/* Short Link */}
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="min-w-0 flex-1 text-left"
          >
            <p className="font-semibold">{link.slug}</p>

            <div className="mt-1 flex items-center gap-2 text-sm">
              {copied ? (
                <span className="font-medium text-emerald-600">✓ Copied!</span>
              ) : (
                <>
                  <span className="truncate text-zinc-500">
                    {origin}/{link.slug}
                  </span>

                  <Copy size={14} />
                </>
              )}
            </div>
          </button>

          {updated ? (
            <span className="text-xs font-medium text-emerald-600 whitespace-nowrap">
              ✓ Updated
            </span>
          ) : (
            <Switch checked={status} onCheckedChange={handleToggle} />
          )}
        </div>

        {/* Mode + Click */}
        <div className="mt-3 flex items-center gap-2 text-sm">
          {link.mode === "direct" ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Direct
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Flow
            </span>
          )}

          <span className="text-zinc-400">•</span>

          <span className="text-zinc-500">
            {link.clicks.toLocaleString()} Clicks
          </span>
        </div>

        {/* Destination Collapse */}

        {showDestination && (
          <div className="mt-2 rounded-lg bg-zinc-50 p-2">
            <p className="break-all text-sm text-zinc-600">
              {link.destination_url}
            </p>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a
              href={`/admin/links/${link.id}/edit`}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 hover:bg-zinc-100"
            >
              <Pencil size={16} />
            </a>

            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </button>

            <button
              type="button"
              onClick={() => setShowDestination(!showDestination)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 hover:bg-zinc-100"
            >
              <Link2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <DeleteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        slug={link.slug}
        onConfirm={handleDelete}
      />
    </>
  );
}
