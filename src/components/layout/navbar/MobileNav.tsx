import { ChevronDown, ChevronRight, ShieldCheck, X } from "lucide-react";
import BrandLogo from "./BrandLogo";

type MobileNavProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isLoggedIn: boolean;

  featuresOpen: boolean;
  setFeaturesOpen: React.Dispatch<React.SetStateAction<boolean>>;

  legalOpen: boolean;
  setLegalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileNav({
  open,
  setOpen,
  isLoggedIn,
  featuresOpen,
  setFeaturesOpen,
  legalOpen,
  setLegalOpen,
}: MobileNavProps) {
  return (
    <>
      {/* Drawer */}

      <div
        className={`fixed inset-0 z-[60] transition ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Overlay */}

        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-80 flex-col bg-white shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}

          <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-5">
            <BrandLogo size="sm" />

            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 transition hover:bg-zinc-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}

          <div className="flex-1 overflow-y-auto p-5">
            {/* Auth */}

            {isLoggedIn ? (
              <a
                href="/admin"
                className="block rounded-xl bg-zinc-900 px-4 py-3 text-center font-semibold text-white transition hover:bg-lime-500 hover:text-zinc-900"
              >
                Dashboard
              </a>
            ) : (
              <div className="space-y-3">
                <a
                  href="/login"
                  className="block rounded-xl border border-zinc-200 px-4 py-3 text-center font-medium transition hover:bg-zinc-100"
                >
                  Login
                </a>

                <a
                  href="/register"
                  className="block rounded-xl bg-zinc-900 px-4 py-3 text-center font-semibold text-white transition hover:bg-lime-500 hover:text-zinc-900"
                >
                  Register
                </a>
              </div>
            )}

            <div className="my-6 border-t border-zinc-200" />

            {/* Features */}

            <button
              onClick={() => setFeaturesOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 transition hover:bg-zinc-100"
            >
              <span className="font-medium">Features</span>

              {featuresOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>

            {featuresOpen && (
              <div className="ml-5 mt-2 flex flex-col gap-1 border-l border-zinc-200 pl-4">
                <a
                  href="/features/short-links"
                  className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100"
                >
                  Short Links
                </a>

                <a
                  href="/features/bio-links"
                  className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100"
                >
                  Bio Links
                </a>

                <a
                  href="/features/qr-maker"
                  className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100"
                >
                  QR Maker
                </a>
              </div>
            )}

            <a
              href="/about"
              className="mt-2 block rounded-xl px-4 py-3 font-medium hover:bg-zinc-100"
            >
              About
            </a>

            <a
              href="/contact"
              className="mt-1 block rounded-xl px-4 py-3 font-medium hover:bg-zinc-100"
            >
              Contact
            </a>

            <div className="my-6 border-t border-zinc-200" />

            {/* Legal */}

            <button
              onClick={() => setLegalOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 hover:bg-zinc-100"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} />
                <span className="font-medium">Legal</span>
              </div>

              {legalOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>

            {legalOpen && (
              <div className="ml-5 mt-2 flex flex-col gap-1 border-l border-zinc-200 pl-4">
                <a
                  href="/legal/privacy"
                  className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100"
                >
                  Privacy Policy
                </a>

                <a
                  href="/legal/terms"
                  className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100"
                >
                  Terms of Service
                </a>

                <a
                  href="/legal/disclaimer"
                  className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100"
                >
                  Disclaimer
                </a>
              </div>
            )}
          </div>

          {/* Footer */}

          <div className="border-t border-zinc-200 p-5">
            <p className="text-center text-xs text-zinc-500">
              © {new Date().getFullYear()} TRIMIT
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
