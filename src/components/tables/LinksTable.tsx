import { useEffect, useMemo, useState } from "react";
import { Copy, Pencil } from "lucide-react";
import { toast } from "sonner";
import Switch from "@/components/ui/Switch";
import { copy } from "@/lib/copy";
import type { Link } from "@/types/link";
import { Trash2 } from "lucide-react";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import Pagination from "@/components/ui/Pagination";
import { getAccessToken } from "@/lib/auth/client";

type Props = {
  links: Link[];
  origin: string;
};

export default function LinksTable({ origin }: Props) {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [items, setItems] = useState<Link[]>([]);
  const PAGE_SIZE = 10;

  const [page, setPage] = useState(1);

  const [updatedId, setUpdatedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [deleteSlug, setDeleteSlug] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deletedId, setDeletedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function loadLinks() {
      try {
        const token = await getAccessToken();

        const res = await fetch("/api/links", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();

        setItems(data);
      } catch {
        toast.error("Failed to load links");
      }
    }

    loadLinks();
  }, []);
  const filteredItems = useMemo(() => {
    const keyword = search.toLowerCase();

    return items.filter((link) => {
      return (
        link.slug.toLowerCase().includes(keyword) ||
        link.destination_url.toLowerCase().includes(keyword)
      );
    });
  }, [items, search]);
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  const paginatedItems = filteredItems.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  useEffect(() => {
    setPage(1);
  }, [search]);
  async function handleCopy(slug: string) {
    const ok = await copy(`${origin}/${slug}`);

    if (ok) {
      setCopiedSlug(slug);
      toast.success("Short link copied");

      setTimeout(() => {
        setCopiedSlug(null);
      }, 1500);
    } else {
      toast.error("Failed to copy");
    }
  }

  async function handleToggle(id: string, status: boolean) {
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
              }
            : item,
        ),
      );

      setUpdatedId(id);

      setTimeout(() => {
        setUpdatedId(null);
      }, 1500);
    } catch {
      toast.error("Failed to update");
    }
  }

  function openDelete(id: string, slug: string) {
    setDeleteId(id);
    setDeleteSlug(slug);
    setDialogOpen(true);
  }

  async function handleDelete() {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/links/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      setItems((prev) => prev.filter((item) => item.id !== deleteId));

      setDeletedId(deleteId);

      setDialogOpen(false);

      setTimeout(() => {
        setDeletedId(null);
      }, 1500);
    } catch {
      alert("Failed to delete.");
    }
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 p-5">
        <input
          type="text"
          placeholder="Search short link or destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 outline-none transition focus:border-zinc-900"
        />
      </div>

      <table className="w-full">
        <thead className="bg-zinc-50">
          <tr className="border-b border-zinc-200">
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
              Short Link
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
              Destination
            </th>
            <th className="w-32 px-6 py-4 text-center text-sm font-semibold text-zinc-600">
              Mode
            </th>

            <th className="w-24 px-6 py-4 text-right text-sm font-semibold text-zinc-600">
              Clicks
            </th>

            <th className="w-32 px-6 py-4 text-center text-sm font-semibold text-zinc-600">
              Actions
            </th>

            <th className="w-28 px-6 py-4 text-center text-sm font-semibold text-zinc-600">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {paginatedItems.map((link) => (
            <tr
              key={link.id}
              className="border-b border-zinc-100 transition hover:bg-zinc-50 last:border-0"
            >
              <td className="px-6 py-5">
                <button
                  type="button"
                  onClick={() => handleCopy(link.slug)}
                  className="group w-full text-left"
                >
                  <p className="font-semibold text-zinc-900">{link.slug}</p>

                  <div className="mt-1 flex items-center gap-2 text-sm">
                    {copiedSlug === link.slug ? (
                      <span className="font-medium text-green-600">
                        ✓ Copied!
                      </span>
                    ) : (
                      <>
                        <span className="text-zinc-500">
                          {origin}/{link.slug}
                        </span>

                        <Copy
                          size={14}
                          className="hidden opacity-0 transition md:block group-hover:opacity-100"
                        />
                      </>
                    )}
                  </div>
                </button>
              </td>

              <td className="max-w-md px-6 py-5">
                <p className="truncate text-zinc-500">{link.destination_url}</p>
              </td>

              <td className="px-6 py-5 text-center">
                {link.mode === "direct" ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Direct
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                    <span className="h-2 w-2 rounded-full bg-sky-500" />
                    Flow
                  </span>
                )}
              </td>

              <td className="px-6 py-5 text-right font-medium">
                {link.clicks.toLocaleString()}
              </td>

              <td className="px-6 py-5">
                {deletedId === link.id ? (
                  <div className="text-center text-xs font-medium text-red-600">
                    ✓ Deleted
                  </div>
                ) : (
                  <div className="flex justify-center gap-2">
                    <a
                      href={`/admin/links/${link.id}/edit`}
                      className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          border
          border-zinc-200
          transition
          hover:bg-zinc-100
        "
                    >
                      <Pencil size={16} />
                    </a>

                    <button
                      type="button"
                      onClick={() => openDelete(link.id, link.slug)}
                      className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          border
          border-red-200
          text-red-600
          transition
          hover:bg-red-50
        "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </td>

              <td className="px-6 py-5 text-center">
                <div className="flex justify-center">
                  {updatedId === link.id ? (
                    <span className="text-xs font-medium text-emerald-600">
                      ✓ Updated
                    </span>
                  ) : (
                    <Switch
                      checked={link.status}
                      onCheckedChange={(checked) =>
                        handleToggle(link.id, checked)
                      }
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}

          {filteredItems.length === 0 && (
            <tr>
              <td colSpan={6} className="py-12 text-center text-zinc-500">
                No links found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={filteredItems.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
      <DeleteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        slug={deleteSlug}
        onConfirm={handleDelete}
      />
    </div>
  );
}
