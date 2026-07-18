import type { RefObject } from "react";
import { toast } from "sonner";

import type { QRCanvasRef } from "./QRCanvas";

interface Props {
  qrRef: RefObject<QRCanvasRef | null>;
  filename: string;
}

export default function DownloadButtons({ qrRef, filename }: Props) {
  async function handleDownloadPNG() {
    try {
      if (!qrRef.current) {
        toast.error("QR not ready");
        return;
      }

      await qrRef.current.download(filename);

      toast.success("QR downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download QR");
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
