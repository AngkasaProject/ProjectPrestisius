import Input from "@/components/forms/Input";
import { Shuffle } from "lucide-react";

type SlugStatus = "idle" | "checking" | "available" | "taken";

type Props = {
  slug: string;
  destination: string;

  generating: boolean;
  slugStatus: SlugStatus;

  onSlugChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onGenerate: () => void;
};

export default function LinkBasicSection({
  slug,
  destination,
  generating,
  slugStatus,
  onSlugChange,
  onDestinationChange,
  onGenerate,
}: Props) {
  return (
    <>
      <Input
        label="Short Link"
        placeholder="google"
        value={slug}
        onChange={(e) => onSlugChange(e.target.value)}
        rightElement={
          <button
            type="button"
            onClick={onGenerate}
            title="Generate random slug"
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 active:scale-95"
          >
            <Shuffle size={18} className={generating ? "animate-spin" : ""} />
          </button>
        }
      />

      <div className="text-sm">
        {slugStatus === "idle" && (
          <p className="text-zinc-400">Enter your custom short link.</p>
        )}

        {slugStatus === "checking" && (
          <p className="text-amber-600">Checking...</p>
        )}

        {slugStatus === "available" && (
          <p className="text-green-600">✓ Available</p>
        )}

        {slugStatus === "taken" && (
          <p className="text-red-600">✕ Already taken</p>
        )}
      </div>

      <Input
        label="Destination URL"
        placeholder="https://google.com"
        value={destination}
        onChange={(e) => onDestinationChange(e.target.value)}
      />
    </>
  );
}
