import { useEffect, useMemo, useState } from "react";
import type { Link } from "@/types/link";
import LinkCard from "./LinkCard";
import Pagination from "@/components/ui/Pagination";

type Props = {
  links: Link[];
  origin: string;
};

export default function LinkCards({ links, origin }: Props) {
  const PAGE_SIZE = 10;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const keyword = search.toLowerCase();

    return links.filter((link) => {
      return (
        link.slug.toLowerCase().includes(keyword) ||
        link.destination_url.toLowerCase().includes(keyword)
      );
    });
  }, [links, search]);
  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  const paginatedItems = filteredItems.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search short link..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-900"
      />
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>
          {filteredItems.length} Link
          {filteredItems.length !== 1 && "s"}
        </span>

        {search && (
          <button
            onClick={() => setSearch("")}
            className="font-medium text-zinc-900"
          >
            Clear
          </button>
        )}
      </div>

      {filteredItems.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center">
          <p className="font-medium text-zinc-700">No links found</p>

          <p className="mt-1 text-sm text-zinc-500">Try another keyword.</p>
        </div>
      )}

      {paginatedItems.map((link) => (
        <LinkCard key={link.id} link={link} origin={origin} />
      ))}

      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={filteredItems.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
}
