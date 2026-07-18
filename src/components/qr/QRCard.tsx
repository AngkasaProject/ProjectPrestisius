import { forwardRef } from "react";
import QRCanvas from "./QRCanvas";

interface Props {
  value: string;

  foreground: string;
  background: string;

  logo?: string;
}

const QRCard = forwardRef<HTMLDivElement, Props>(
  ({ value, foreground, background, logo }, ref) => {
    return (
      <div
        ref={ref}
        className="mx-auto w-full max-w-[420px] rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
      >
        <div className="flex justify-center">
          <QRCanvas
            value={value}
            foreground={foreground}
            background={background}
            logo={logo}
          />
        </div>

        <div className="mt-6 border-t border-zinc-200 pt-5">
          <p className="truncate text-center text-base font-semibold text-zinc-900">
            {value || "No URL selected"}
          </p>

          <p className="mt-2 text-center text-xs text-zinc-500">
            Generated with{" "}
            <span className="font-semibold text-zinc-700">TRIMIT</span>
          </p>
        </div>
      </div>
    );
  },
);

QRCard.displayName = "QRCard";

export default QRCard;
