import { ImagePlus } from "lucide-react";

type Props = {
  title: string;
  description: string;
  image: File | null;

  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onImageChange: (file: File | null) => void;
};

export default function OpenGraphFields({
  title,
  description,
  image,
  onTitleChange,
  onDescriptionChange,
  onImageChange,
}: Props) {
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
              PNG, JPG, WEBP (Max 5 MB)
            </p>

            {image && (
              <p className="mt-2 text-xs text-lime-600">{image.name}</p>
            )}
          </div>

          <input
            hidden
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>
    </div>
  );
}
