export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-lg font-bold text-white">
        LS
      </div>

      <div>
        <h1 className="text-lg font-bold leading-none">LinkShortener</h1>

        <p className="text-xs text-zinc-500">Dashboard</p>
      </div>
    </div>
  );
}
