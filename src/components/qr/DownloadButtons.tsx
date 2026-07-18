import type { RefObject } from "react";
import domtoimage from "dom-to-image-more";
import { toast } from "sonner";

interface Props {
  cardRef: RefObject<HTMLDivElement | null>;
  filename: string;
}

export default function DownloadButtons({ cardRef, filename }: Props) {
  async function handleDownloadPNG() {
    if (!cardRef.current) {
      toast.error("QR Card not found");
      return;
    }

    try {
      const dataUrl = await domtoimage.toPng(cardRef.current, {
        bgcolor: "#ffffff",
        quality: 1,
        scale: 4,
        cacheBust: true,
        width: cardRef.current.scrollWidth,
        height: cardRef.current.scrollHeight,
      });

      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("PNG downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download PNG");
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={handleDownloadPNG}
        className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100"
      >
        Download PNG
      </button>

      <button
        type="button"
        disabled
        className="cursor-not-allowed rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-400"
      >
        Download SVG
      </button>
    </div>
  );
}
