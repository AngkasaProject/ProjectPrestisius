import { useEffect, useState } from "react";
import { Check, ImageIcon } from "lucide-react";

import { getMyImages } from "@/services/images/client";
import type { ImageAsset } from "@/types/image";

type Props = {
  value: string | null;
  onSelect: (image: ImageAsset) => void;
};

export default function ImageLibrary({ value, onSelect }: Props) {
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      const data = await getMyImages();
      setImages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square animate-pulse rounded-xl bg-zinc-200"
          />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 py-10">
        <ImageIcon size={36} className="mb-3 text-zinc-400" />

        <p className="font-medium">No Images Yet</p>

        <p className="mt-1 text-center text-sm text-zinc-500">
          Upload your first image to build your media library.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Media Library</h3>

          <p className="text-sm text-zinc-500">
            {images.length} image
            {images.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
        {images.map((image) => {
          const selected = value === image.url;

          return (
            <button
              key={image.id}
              type="button"
              onClick={() => onSelect(image)}
              className={`group relative overflow-hidden rounded-xl border transition ${
                selected
                  ? "border-lime-500 ring-2 ring-lime-500"
                  : "border-zinc-200 hover:border-lime-400"
              }`}
            >
              <img
                src={image.url}
                alt={image.filename}
                className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
              />

              {/* Hover */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                <p className="truncate text-left text-xs text-white">
                  {image.filename}
                </p>
              </div>

              {/* Selected */}
              {selected && (
                <>
                  <div className="absolute inset-0 bg-lime-500/20" />

                  <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-lime-500 text-white shadow">
                    <Check size={16} />
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
