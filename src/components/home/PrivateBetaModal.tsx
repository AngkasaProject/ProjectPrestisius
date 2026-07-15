import { useEffect, useState } from "react";

export default function PrivateBetaModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  function closeModal() {
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl animate-[modal_0.25s_ease-out]">
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="p-8">
          <div className="mx-auto inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
            Private Beta
          </div>

          <div className="mt-6 flex justify-center text-5xl">🚧</div>

          <h2 className="mt-6 text-center text-3xl font-bold">TRIM IT</h2>

          <p className="mt-4 text-center leading-7 text-zinc-500">
            Terima kasih telah mengunjungi TRIM IT.
          </p>

          <p className="mt-2 text-center leading-5 text-zinc-500">
            Platform ini masih berada dalam tahap
            <span className="font-semibold text-zinc-800"> Private Beta</span>.
            layanan belum tersedia untuk publik.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href="/login"
              className="flex h-12 items-center justify-center rounded-xl bg-zinc-900 font-medium text-white transition hover:bg-zinc-800"
            >
              Login
            </a>

            <a
              href="/register"
              className="flex h-12 items-center justify-center rounded-xl border border-zinc-200 font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              Register
            </a>

            <button
              onClick={closeModal}
              className="mt-2 w-full text-center text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
            >
              Continue Exploring →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
