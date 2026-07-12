import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";

type Props = {
  openSidebar: () => void;
};

export default function Navbar({ openSidebar }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Mobile Search */}
        {searchOpen ? (
          <div className="flex w-full items-center gap-2">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                ref={inputRef}
                placeholder="Search..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-4 outline-none transition focus:border-zinc-900"
              />
            </div>

            <button
              onClick={() => setSearchOpen(false)}
              className="rounded-xl border border-zinc-200 p-2 transition hover:bg-zinc-100"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <>
            {/* Left */}
            <div className="flex items-center gap-3">
              <button
                onClick={openSidebar}
                className="rounded-xl border border-zinc-200 p-2 transition hover:bg-zinc-100 lg:hidden"
              >
                <Menu size={20} />
              </button>

              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* Desktop Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />

                  <input
                    placeholder="Search..."
                    className="w-72 rounded-xl border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-4 outline-none transition focus:border-zinc-900"
                  />
                </div>
              </div>

              {/* Mobile Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="rounded-xl border border-zinc-200 p-2 transition hover:bg-zinc-100 md:hidden"
              >
                <Search size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
