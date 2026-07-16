type Props = {
  title: string;
  description: string;

  imageFile: File | null;
  imageUrl: string | null;
};

export default function OpenGraphPreview({
  title,
  description,
  imageFile,
  imageUrl,
}: Props) {
  const previewImage = imageFile
    ? URL.createObjectURL(imageFile)
    : (imageUrl ?? "/brand/logo-kotak.png");

  return (
    <>
      <h3 className="mb-3 text-sm font-medium text-zinc-500">Live Preview</h3>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <img
          src={previewImage}
          alt="Preview"
          className="aspect-[1.91/1] w-full bg-zinc-100 object-contain"
        />

        <div className="border-t border-zinc-100 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-400">
            trimit.my.id
          </p>

          <h4 className="mt-2 line-clamp-2 text-base font-semibold leading-6">
            {title || "Open Graph Title"}
          </h4>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-500">
            {description ||
              "This is how your link will appear when shared on WhatsApp, Facebook and other social platforms."}
          </p>
        </div>
      </div>
    </>
  );
}
