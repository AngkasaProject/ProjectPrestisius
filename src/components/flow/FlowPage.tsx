import { Globe, ShieldCheck, CircleHelp, LockKeyhole } from "lucide-react";
import CountdownButton from "./CountdownButton";
import LeftSidebarAd from "./LeftSidebarAd";
import RightSidebarAd from "./RightSidebarAd";

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
  const secure = destination.startsWith("https://");

  return (
    <main className="min-h-screen bg-zinc-100 py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 xl:grid-cols-[180px_minmax(0,760px)_180px]">
        {/* LEFT ADS */}
        <LeftSidebarAd />

        {/* CONTENT */}
        <section>
          {/* HEADER */}
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg">
              <ShieldCheck size={30} />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-zinc-900">
              Link Verification
            </h1>

            <p className="mt-2 text-zinc-500">
              Pastikan tujuan tautan sudah sesuai sebelum melanjutkan.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl">
            {/* PREVIEW */}
            <div>
              {metadata.image ? (
                <img
                  src={metadata.image}
                  alt={metadata.title}
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center bg-zinc-100">
                  <Globe size={52} className="text-zinc-400" />
                </div>
              )}

              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  {metadata.favicon ? (
                    <img
                      src={metadata.favicon}
                      alt=""
                      className="h-7 w-7 rounded"
                    />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-zinc-100">
                      <Globe size={16} className="text-zinc-500" />
                    </div>
                  )}

                  <span className="text-sm font-medium text-zinc-500">
                    {hostname}
                  </span>
                </div>

                <h2 className="line-clamp-2 text-2xl font-bold text-zinc-900">
                  {metadata.title || hostname}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-500">
                  {metadata.description ||
                    "Tidak ada deskripsi yang tersedia untuk website ini."}
                </p>
              </div>
            </div>

            {/* DESTINATION */}
            <div className="border-t border-zinc-200 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Destination
              </h3>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Globe size={20} className="text-zinc-700" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-zinc-900">{hostname}</p>

                    <p className="mt-1 break-all text-xs text-zinc-500">
                      {destination}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                        <ShieldCheck size={14} />
                        Metadata Available
                      </span>

                      {secure ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                          <LockKeyhole size={14} />
                          HTTPS Secure
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                          <LockKeyhole size={14} />
                          Non Secure
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECURITY */}
            <div className="border-t border-zinc-200 bg-emerald-50 p-6">
              <div className="flex gap-3">
                <CircleHelp
                  size={20}
                  className="mt-1 shrink-0 text-emerald-600"
                />

                <div>
                  <h3 className="font-semibold text-emerald-800">
                    Mengapa halaman ini ditampilkan?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-emerald-700">
                    Halaman ini membantu Anda memverifikasi tujuan tautan
                    sebelum diarahkan ke website tujuan. Luangkan beberapa detik
                    untuk memastikan domain dan informasi yang ditampilkan sudah
                    sesuai.
                  </p>

                  <ul className="mt-5 space-y-2 text-sm text-emerald-700">
                    <li>✓ Periksa nama domain tujuan.</li>
                    <li>✓ Pastikan judul website sudah sesuai.</li>
                    <li>✓ Hindari tautan yang mencurigakan.</li>
                    <li>✓ Kami tidak meminta data pribadi Anda.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="border-t border-zinc-200 p-6">
              <CountdownButton destination={destination} countdown={5} />
            </div>

            {/* MOBILE ADS */}
            <div className="border-t border-zinc-200 bg-zinc-50 p-6 xl:hidden">
              <div className="flex h-24 items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-white text-sm text-zinc-400">
                Mobile Advertisement
              </div>
            </div>

            {/* FOOTER */}
            <div className="border-t border-zinc-200 px-6 py-5 text-center">
              <p className="text-xs text-zinc-500">
                Powered by{" "}
                <span className="font-semibold text-zinc-900">
                  Angkasa Project
                </span>
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Safe Link Redirect Service
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT ADS */}
        <RightSidebarAd />
      </div>
    </main>
  );
}
