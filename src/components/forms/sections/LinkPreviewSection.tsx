import Button from "@/components/ui/Button";

type Props = {
  preview: string;
  onCopy: () => void;
};

export default function LinkPreviewSection({ preview, onCopy }: Props) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">Preview</p>

      <div className="flex flex-col gap-3 rounded-xl bg-zinc-100 p-4 md:flex-row md:items-center md:justify-between">
        <span className="break-all text-sm text-zinc-700">
          {preview || "https://domain.com/your-link"}
        </span>

        <Button type="button" onClick={onCopy}>
          Copy
        </Button>
      </div>
    </div>
  );
}
