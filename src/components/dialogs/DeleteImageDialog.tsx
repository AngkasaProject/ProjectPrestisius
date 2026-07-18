type Props = {
  open: boolean;
  loading?: boolean;
  filename: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteImageDialog({
  open,
  loading = false,
  filename,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-zinc-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-red-600">Delete Image</h2>

          <p className="mt-1 text-sm text-zinc-500">
            This action is permanent.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4 px-6 py-5">
          <p className="text-sm leading-6 text-zinc-700">
            Are you sure you want to permanently delete this image?
          </p>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Filename
            </p>

            <p
              className="truncate text-sm font-medium text-zinc-900"
              title={filename}
            >
              {filename}
            </p>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-xs font-medium text-red-700">
              This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-zinc-200 px-6 py-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Image"}
          </button>
        </div>
      </div>
    </div>
  );
}
