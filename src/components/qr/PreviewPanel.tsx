import { useRef } from "react";

import QRControls from "./QRControls";
import DownloadButtons from "./DownloadButtons";
import QRCard from "./QRCard";

interface PreviewPanelProps {
  value: string;
  filename: string;

  foreground: string;
  background: string;

  onForegroundChange: (value: string) => void;
  onBackgroundChange: (value: string) => void;
}

export default function PreviewPanel({
  value,
  foreground,
  filename,
  background,
  onForegroundChange,
  onBackgroundChange,
}: PreviewPanelProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <h2 className="text-lg font-semibold">Preview</h2>

      <div className="mt-6 flex justify-center">
        <QRCard
          ref={cardRef}
          value={value}
          foreground={foreground}
          background={background}
        />
      </div>

      <div className="mt-6">
        <p className="truncate rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-600">
          {value || "No URL selected"}
        </p>
      </div>

      <div className="mt-6">
        <QRControls
          foreground={foreground}
          background={background}
          onForegroundChange={onForegroundChange}
          onBackgroundChange={onBackgroundChange}
        />
      </div>

      <div className="mt-6">
        <DownloadButtons cardRef={cardRef} filename={filename} />
      </div>
    </div>
  );
}
