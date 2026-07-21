import { useEffect, useState } from "react";
import { ArrowRight, LoaderCircle, ExternalLink } from "lucide-react";

type Props = {
  destination: string;
  countdown?: number;
};

export default function CountdownButton({ destination, countdown = 5 }: Props) {
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(countdown);

  useEffect(() => {
    if (!started) return;

    if (seconds <= 0) {
      window.location.href = destination;
      return;
    }

    const timer = window.setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [started, seconds, destination]);

  // Progress %
  const progress = ((countdown - seconds) / countdown) * 100;

  if (!started) {
    return (
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 font-medium text-white transition hover:bg-black"
        >
          Lanjut ke Website
          <ArrowRight size={18} />
        </button>

        <button
          type="button"
          onClick={() => history.back()}
          className="h-12 w-full rounded-xl border border-zinc-200 bg-white font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
      <div className="flex items-center justify-center">
        <LoaderCircle className="animate-spin text-zinc-700" size={26} />
      </div>

      <div className="text-center">
        <p className="text-sm text-zinc-500">Redirect dalam</p>

        <h2 className="mt-2 text-5xl font-bold tracking-tight text-zinc-900">
          {seconds}
        </h2>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-zinc-900 transition-all duration-1000"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <a
        href={destination}
        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white font-medium text-zinc-800 ring-1 ring-zinc-200 transition hover:bg-zinc-100"
      >
        Redirect Sekarang
        <ExternalLink size={16} />
      </a>
    </div>
  );
}
