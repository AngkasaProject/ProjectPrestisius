import { ChartColumn, ImageIcon, Link2, UserRound } from "lucide-react";

import InstantShortener from "./InstantShortener";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28 pb-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-zinc-50 to-white" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/20 blur-3xl" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#000 1px,transparent 1px),
            linear-gradient(to bottom,#000 1px,transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <img
          src="/brand/logo-kotak.png"
          alt="TRIM IT"
          className="mt-5 h-20 w-auto sm:h-24 md:h-28"
        />

        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
          TRIM IT
        </h1>

        <p className="mt-1 text-base italic text-zinc-500">
          By Angkasa Project
        </p>

        <p className="mt-6 max-w-2xl px-4 text-base leading-7 text-zinc-600 md:text-lg md:leading-8">
          Modern URL Shortener built for creators, businesses, and everyone who
          wants to share links beautifully.
        </p>

        <InstantShortener />

        {/* Feature Chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 px-4">
          <Chip icon={<Link2 size={16} />} label="Short URL" />

          <Chip icon={<UserRound size={16} />} label="Bio Page (Soon)" />
        </div>

        <p className="mt-8 max-w-lg px-6 text-center text-sm leading-6 text-zinc-500">
          By using this service, you agree to our{" "}
          <a
            href="/legal/terms"
            className="font-medium text-zinc-900 underline underline-offset-4 transition hover:text-lime-600"
          >
            Terms of Service
          </a>
          .
        </p>
      </div>
    </section>
  );
}

type ChipProps = {
  icon: React.ReactNode;
  label: string;
};

function Chip({ icon, label }: ChipProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-lime-400 hover:shadow-md">
      {icon}
      {label}
    </div>
  );
}
