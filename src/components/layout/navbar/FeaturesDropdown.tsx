import { ChevronDown, Link2, QrCode, UserSquare2 } from "lucide-react";

type Props = {
  featuresOpen: boolean;
  setFeaturesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  featuresRef: React.RefObject<HTMLDivElement | null>;
};

export default function FeaturesDropdown({
  featuresOpen,
  setFeaturesOpen,
  featuresRef,
}: Props) {
  return (
    <div ref={featuresRef} className="relative">
      <button
        onClick={() => setFeaturesOpen((v) => !v)}
        className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
      >
        Features
        <ChevronDown
          size={16}
          className={`transition duration-200 ${
            featuresOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {featuresOpen && (
        <div
          className="
            absolute
            left-1/2
            top-14
            w-72
            -translate-x-1/2
            overflow-hidden
            rounded-2xl
            border
            border-zinc-200
            bg-white
            p-2
            shadow-2xl
          "
        >
          <a
            href="/features/short-links"
            className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-zinc-100"
          >
            <Link2 size={18} className="mt-1 text-lime-600" />

            <div>
              <p className="font-semibold">Short Links</p>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Powerful URL shortening with analytics.
              </p>
            </div>
          </a>

          <a
            href="/features/bio-links"
            className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-zinc-100"
          >
            <UserSquare2 size={18} className="mt-1 text-lime-600" />

            <div>
              <p className="font-semibold">Bio Links</p>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                One page for all your social links.
              </p>
            </div>
          </a>

          <a
            href="/features/qr-maker"
            className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-zinc-100"
          >
            <QrCode size={18} className="mt-1 text-lime-600" />

            <div>
              <p className="font-semibold">QR Maker</p>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Generate beautiful QR codes instantly.
              </p>
            </div>
          </a>

          <div className="my-2 border-t border-zinc-200" />

          <div className="px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Coming Soon
            </p>

            <div className="mt-2 space-y-1 text-sm text-zinc-500">
              <div>Analytics</div>
              <div>Developer API</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
