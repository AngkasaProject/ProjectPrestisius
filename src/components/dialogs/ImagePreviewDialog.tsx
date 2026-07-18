import type { ImageAsset } from "@/types/image";

type Props = {
  image: ImageAsset | null;
  onClose: () => void;
  onDelete: () => void;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ImagePreviewDialog({
  image,
  onClose,
  onDelete,
}: Props) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              Image Details
            </h2>

            <p className="text-xs text-zinc-500">View image information.</p>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            ✕
          </button>
        </div>

        {/* Preview */}
        <div className="flex justify-center px-5 py-6">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-white">
            <img
              src={image.url}
              alt={image.filename}
              className="max-h-full max-w-full object-contain p-2"
            />
          </div>
        </div>

        {/* Information */}
        <div className="space-y-5 px-5 pb-6">
          <div>
            <p className="mb-1 text-xs font-medium text-zinc-500">Filename</p>

            <p
              className="truncate text-sm font-semibold text-zinc-900"
              title={image.filename}
            >
              {image.filename}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="mb-1 text-xs font-medium text-zinc-500">Size</p>

              <p className="text-sm font-semibold text-zinc-900">
                {formatFileSize(image.size)}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium text-zinc-500">Uploaded</p>

              <p className="text-sm font-semibold text-zinc-900">
                {formatDate(image.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-200 p-5">
          <button
            onClick={onDelete}
            className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete Image
          </button>
        </div>
      </div>
    </div>
  );
}
