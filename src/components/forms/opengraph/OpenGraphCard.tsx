import OpenGraphFields from "./OpenGraphFields";
import OpenGraphPreview from "./OpenGraphPreview";

type Props = {
  value: "destination" | "custom";

  title: string;
  description: string;

  imageFile: File | null;
  imageUrl: string | null;
  imageId: string | null;

  onChange: (value: "destination" | "custom") => void;

  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;

  onImageFileChange: (file: File | null) => void;
  onImageUrlChange: (url: string | null) => void;

  onImageIdChange: (id: string | null) => void;
};

export default function OpenGraphCard({
  value,
  title,
  description,

  imageFile,
  imageUrl,
  imageId,

  onChange,

  onTitleChange,
  onDescriptionChange,

  onImageFileChange,
  onImageUrlChange,
  onImageIdChange,
}: Props) {
  return (
    <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
      <div>
        <h2 className="text-lg font-semibold">Open Graph</h2>

        <p className="mt-1 text-sm text-zinc-500">
          Control how your short link appears when shared.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-200 p-4 transition hover:border-lime-400">
          <input
            type="radio"
            checked={value === "destination"}
            onChange={() => onChange("destination")}
            className="mt-1"
          />

          <div>
            <p className="font-medium">Use destination metadata</p>

            <p className="mt-1 text-sm text-zinc-500">
              Automatically use the title, description and preview image from
              the destination website.
            </p>
          </div>
        </label>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-200 p-4 transition hover:border-lime-400">
          <input
            type="radio"
            checked={value === "custom"}
            onChange={() => onChange("custom")}
            className="mt-1"
          />

          <div>
            <p className="font-medium">Custom Preview</p>

            <p className="mt-1 text-sm text-zinc-500">
              Customize the title, description and image shown when this link is
              shared.
            </p>
          </div>
        </label>
        {value === "custom" && (
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <OpenGraphPreview
                title={title}
                description={description}
                imageFile={imageFile}
                imageUrl={imageUrl}
              />
            </div>

            <OpenGraphFields
              title={title}
              description={description}
              imageFile={imageFile}
              imageUrl={imageUrl}
              imageId={imageId}
              onTitleChange={onTitleChange}
              onDescriptionChange={onDescriptionChange}
              onImageFileChange={onImageFileChange}
              onImageUrlChange={onImageUrlChange}
              onImageIdChange={onImageIdChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
