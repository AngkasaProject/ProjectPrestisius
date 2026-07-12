import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

type Props = {
  destination: string;
  countdown: number;
};

export default function CountdownButton({ destination, countdown }: Props) {
  const [seconds, setSeconds] = useState(countdown);

  useEffect(() => {
    if (seconds <= 0) {
      window.location.href = destination;
      return;
    }

    const timer = window.setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, destination]);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-zinc-500">
          Anda akan dialihkan otomatis dalam
        </p>

        <p className="mt-2 text-4xl font-bold text-zinc-900">{seconds}</p>

        <p className="mt-3 text-sm text-zinc-500">
          Jika tidak dialihkan secara otomatis,
          <br />
          silakan klik tombol di bawah.
        </p>
      </div>

      <a
        href={destination}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 font-medium text-white transition hover:bg-zinc-800"
      >
        Lanjutkan Sekarang
        <ArrowRight size={18} />
      </a>
    </div>
  );
}
