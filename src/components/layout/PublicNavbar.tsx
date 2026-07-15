import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ShieldCheck, ChevronDown, ChevronRight } from "lucide-react";

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-1/2 top-5 z-50 w-[calc(100%-24px)] max-w-6xl -translate-x-1/2 transition-all duration-300 ${
          scrolled
            ? "rounded-full border border-zinc-200/70 bg-white/85 shadow-xl backdrop-blur-xl"
            : "rounded-full border border-transparent bg-white/65 backdrop-blur-lg"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 lg:px-7">
          <a href="/" className="shrink-0">
            <img src="/brand/logo.png" alt="TRIM IT" className="h-9 w-auto" />
          </a>

          <nav className="hidden items-center gap-2 md:flex">
            <a
              href="/login"
              className="rounded-full px-5 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              Login
            </a>

            <a
              href="/register"
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-lime-500 hover:text-zinc-900"
            >
              Register
            </a>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="rounded-full p-2 transition hover:bg-zinc-100 md:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <aside
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b px-5">
            <img src="/brand/logo.png" alt="TRIM IT" className="h-8 w-auto" />

            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 hover:bg-zinc-100"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2 p-5">
            <a
              href="/login"
              className="
    rounded-xl
    border
    border-zinc-200
    bg-white
    px-4
    py-3
    text-center
    font-medium
    shadow-sm
    transition
    hover:-translate-y-0.5
    hover:border-zinc-300
    hover:shadow-md
  "
            >
              Login
            </a>

            <a
              href="/register"
              className="
    rounded-xl
    bg-zinc-900
    px-4
    py-3
    text-center
    font-medium
    text-white
    shadow-lg
    transition
    hover:-translate-y-0.5
    hover:bg-lime-500
    hover:text-zinc-900
  "
            >
              Register
            </a>

            <div className="my-4 border-t border-zinc-200" />

            <div className="my-4 border-t border-zinc-200" />

            <button
              onClick={() => setLegalOpen(!legalOpen)}
              className="
    flex
    w-full
    items-center
    justify-between
    bg-white
    px-4
    py-3
    font-medium
    text-zinc-700

    transition
    hover:-translate-y-0.5
    hover:border-zinc-300
    hover:shadow-md
  "
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} />
                <span>Legal</span>
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
                  href="/legal/terms"
                  className="rounded-lg px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
                >
                  Terms of Service
                </a>

                <a
                  href="/legal/disclaimer"
                  className="rounded-lg px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
                >
                  Disclaimer
                </a>
              </div>
            )}
          </nav>
        </aside>
      </div>
    </>
  );
}
