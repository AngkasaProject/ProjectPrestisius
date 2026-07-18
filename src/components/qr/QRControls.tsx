interface Props {
  foreground: string;
  background: string;

  onForegroundChange: (value: string) => void;
  onBackgroundChange: (value: string) => void;
}

export default function QRControls({
  foreground,
  background,
  onForegroundChange,
  onBackgroundChange,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-semibold text-zinc-900">Appearance</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-zinc-600">Foreground</span>

            <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-2">
              <input
                type="color"
                value={foreground}
                onChange={(e) => onForegroundChange(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
              />

              <input
                type="text"
                value={foreground}
                onChange={(e) => onForegroundChange(e.target.value)}
                className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm text-zinc-600">Background</span>

            <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-2">
              <input
                type="color"
                value={background}
                onChange={(e) => onBackgroundChange(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
              />

              <input
                type="text"
                value={background}
                onChange={(e) => onBackgroundChange(e.target.value)}
                className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
