type Props = {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: Props) {
  if (totalItems === 0 || totalPages <= 1) {
    return null;
  }

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="mt-6 flex flex-col gap-4 border-t border-zinc-200 pt-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-zinc-500">
        Showing {start}-{end} of {totalItems}{" "}
        {totalItems === 1 ? "link" : "links"}
      </p>

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-xl border border-zinc-200 px-4 py-2 text-sm transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-2 md:flex">
          {Array.from({ length: totalPages }, (_, index) => {
            const current = index + 1;

            return (
              <button
                key={current}
                type="button"
                onClick={() => onPageChange(current)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm transition ${
                  page === current
                    ? "bg-zinc-900 text-white"
                    : "border border-zinc-200 hover:bg-zinc-100"
                }`}
              >
                {current}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-xl border border-zinc-200 px-4 py-2 text-sm transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
