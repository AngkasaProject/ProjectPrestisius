import { Globe, ShieldCheck } from "lucide-react";
import CountdownButton from "./CountdownButton";

type Props = {
  destination: string;
  hostname: string;
  countdown?: number;

  metadata: {
    title: string;
    description: string;
    image: string | null;
    favicon: string | null;
  };
};

export default function FlowPage({ destination, hostname, metadata }: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-10">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl">
        {/* Header */}
        <div className="border-b border-zinc-200 px-8 py-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-xl font-bold text-white">
            AP
          </div>

          <h1 className="mt-6 text-3xl font-bold text-zinc-900">
            Angkasa Project
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Anda akan diarahkan ke website berikut.
          </p>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {metadata.image && (
            <img
              src={metadata.image}
              alt={metadata.title}
              className="h-48 w-full object-cover"
            />
          )}

          <div className="p-5">
            <div className="mb-3 flex items-center gap-3">
              {metadata.favicon && (
                <img
                  src={metadata.favicon}
                  alt=""
                  className="h-6 w-6 rounded"
                />
              )}

              <span className="text-sm text-zinc-500">{hostname}</span>
            </div>

            <h3 className="line-clamp-2 text-lg font-semibold text-zinc-900">
              {metadata.title || hostname}
            </h3>

            <p className="mt-2 line-clamp-3 text-sm text-zinc-500">
              {metadata.description || "Tidak ada deskripsi."}
            </p>
          </div>
        </div>
        {/* Destination */}
        <div className="px-8 py-6">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                <Globe size={20} className="text-zinc-700" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-900">
                  {hostname}
                </p>

                <p className="mt-1 truncate text-xs text-zinc-500">
                  {destination}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-xl bg-emerald-50 p-4">
            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <p className="text-sm leading-6 text-emerald-700">
              Pastikan alamat tujuan sudah sesuai sebelum melanjutkan.
            </p>
          </div>

          {/* Button */}
          <div className="mt-6 space-y-3">
            <CountdownButton destination={destination} countdown={10} />

            <button
              type="button"
              onClick={() => history.back()}
              className="h-12 w-full rounded-xl border border-zinc-200 bg-white font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              Kembali
            </button>
          </div>
        </div>

        {/* Ads */}
        <div className="border-y border-zinc-200 bg-zinc-50 px-8 py-6">
          <div className="flex h-24 items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-white text-sm text-zinc-400">
            Advertisement
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 text-center">
          <p className="text-xs text-zinc-500">
            Powered by{" "}
            <span className="font-semibold text-zinc-800">Angkasa Project</span>
          </p>
        </div>
      </div>
    </main>
  );
}
