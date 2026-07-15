import { useState } from "react";
import { Link2 } from "lucide-react";

export default function InstantShortener() {
  const [url, setUrl] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    window.dispatchEvent(new Event("open-private-beta"));
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 w-full max-w-3xl">
      <div className="rounded-full border border-zinc-200 bg-white p-2 shadow-xl">
        <div className="flex items-center gap-2">
          <Link2 size={18} className="ml-3 shrink-0 text-zinc-400" />

          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL..."
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400 md:text-base"
          />

          <button
            type="submit"
            className="
              h-12
              rounded-full
              bg-zinc-900
              px-5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-lime-500
              hover:text-zinc-900

              md:px-8
              md:text-base
            "
          >
            Trim It
          </button>
        </div>
      </div>
    </form>
  );
}
