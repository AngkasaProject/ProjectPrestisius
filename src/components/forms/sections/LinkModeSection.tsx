type Props = {
  value: "direct" | "flow";
  onChange: (value: "direct" | "flow") => void;
};

export default function LinkModeSection({ value, onChange }: Props) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-zinc-800">
        Redirect Mode
      </label>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange("direct")}
          className={`rounded-2xl border p-4 text-left transition ${
            value === "direct"
              ? "border-lime-500 bg-lime-50 shadow-sm"
              : "border-zinc-200 bg-white hover:border-zinc-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                value === "direct" ? "bg-lime-500" : "bg-zinc-300"
              }`}
            />

            <p className="font-semibold">Direct</p>
          </div>

          <p className="mt-2 text-sm text-zinc-500">
            Redirect visitors instantly.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onChange("flow")}
          className={`rounded-2xl border p-4 text-left transition ${
            value === "flow"
              ? "border-lime-500 bg-lime-50 shadow-sm"
              : "border-zinc-200 bg-white hover:border-zinc-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                value === "flow" ? "bg-lime-500" : "bg-zinc-300"
              }`}
            />

            <p className="font-semibold">Flow</p>
          </div>

          <p className="mt-2 text-sm text-zinc-500">
            Show a page before redirecting.
          </p>
        </button>
      </div>
    </div>
  );
}
