import { useState } from "react";
import { ImagePlus, Images } from "lucide-react";

import ImageLibrary from "@/components/image-library/ImageLibrary";

type Props = {
  title: string;
  description: string;

  imageFile: File | null;
  imageUrl: string | null;

  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;

  onImageFileChange: (file: File | null) => void;
  onImageUrlChange: (url: string | null) => void;
};

export default function OpenGraphFields({
  title,
  description,

  imageFile,
  imageUrl,

  onTitleChange,
  onDescriptionChange,

  onImageFileChange,
  onImageUrlChange,
}: Props) {
  const [showLibrary, setShowLibrary] = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Open Graph Title
        </label>

        <input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="My Awesome Website"
          className="h-12 w-full rounded-xl border border-zinc-200 px-4 outline-none focus:border-lime-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Open Graph Description
        </label>

        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={4}
          placeholder="Describe how this link should appear when shared..."
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-lime-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Open Graph Image
        </label>

        <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-zinc-300 p-8 transition hover:border-lime-500">
          <ImagePlus size={22} />

          <div className="text-center">
            <p className="font-medium">Upload Image</p>

            <p className="mt-1 text-sm text-zinc-500">
              PNG, JPG, WEBP (Max 1 MB)
            </p>

            {imageFile && (
              <p className="mt-2 text-xs font-medium text-lime-600">
                {imageFile.name}
              </p>
            )}
          </div>
          {imageUrl && !imageFile && (
            <>
              <p className="mt-2 text-xs font-medium text-lime-600">
                Image selected from Media Library
              </p>

              <img
                src={imageUrl}
                alt="Selected"
                className="mx-auto mt-3 h-20 w-20 rounded-lg border border-zinc-200 object-cover"
              />
            </>
          )}
          <input
            hidden
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;

              onImageFileChange(file);

              if (file) {
                onImageUrlChange(null);
              }
            }}
          />
        </label>

        <button
          type="button"
          onClick={() => setShowLibrary((prev) => !prev)}
          className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 font-medium transition hover:border-lime-500 hover:text-lime-600"
        >
          <Images size={18} />

          {showLibrary ? "Hide Media Library" : "Choose From Media Library"}
        </button>

        {showLibrary && (
          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <ImageLibrary
              value={imageUrl}
              onSelect={(image) => {
                onImageFileChange(null);
                onImageUrlChange(image.url);

                setShowLibrary(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
