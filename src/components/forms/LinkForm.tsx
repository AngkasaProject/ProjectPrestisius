import { useEffect, useMemo, useState } from "react";
import type { Link } from "@/types/link";
import Button from "@/components/ui/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import { Shuffle } from "lucide-react";
import { getAccessToken } from "@/lib/auth/client";
import OpenGraphCard from "./opengraph/OpenGraphCard";

type SlugStatus = "idle" | "checking" | "available" | "taken";

type Props = {
  origin: string;
  mode?: "create" | "edit";
  initialData?: Link;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "")
    .replace(/-+/g, "-")
    .slice(0, 50);
}

function generateRandomSlug(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function LinkForm({
  origin,
  mode = "create",
  initialData,
}: Props) {
  const [ogTitle, setOgTitle] = useState("");

  const [ogDescription, setOgDescription] = useState("");

  const [ogImage, setOgImage] = useState<File | null>(null);
  const [ogMode, setOgMode] = useState<"destination" | "custom">("destination");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [generating, setGenerating] = useState(false);
  const [destination, setDestination] = useState(
    initialData?.destination_url ?? "",
  );

  const [modeValue, setModeValue] = useState<"direct" | "flow">(
    initialData?.mode ?? "direct",
  );

  const [status] = useState(initialData?.status ?? true);

  const [slugStatus, setSlugStatus] = useState<SlugStatus>("idle");

  const [saving, setSaving] = useState(false);

  const preview = useMemo(() => {
    if (!origin || !slug) return "";

    return `${origin}/${slug}`;
  }, [origin, slug]);

  useEffect(() => {
    if (mode === "edit" && initialData && slug === initialData.slug) {
      setSlugStatus("available");
      return;
    }

    if (!slug) {
      setSlugStatus("idle");
      return;
    }

    const timeout = setTimeout(async () => {
      setSlugStatus("checking");

      try {
        const res = await fetch(
          `/api/links/check-slug?slug=${encodeURIComponent(slug)}`,
        );

        const json = await res.json();

        setSlugStatus(json.available ? "available" : "taken");
      } catch {
        setSlugStatus("taken");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [slug]);
  async function handleGenerate() {
    setGenerating(true);
    setSlugStatus("checking");

    while (true) {
      const random = generateRandomSlug();

      try {
        const res = await fetch(`/api/links/check-slug?slug=${random}`);

        const json = await res.json();

        if (json.available) {
          setSlug(random);
          setSlugStatus("available");
          break;
        }
      } catch {
        setSlugStatus("idle");
        break;
      }
    }

    setGenerating(false);
  }

  async function handleSave() {
    if (saving) return;

    if (slugStatus !== "available") return;

    if (!isValidUrl(destination)) return;

    setSaving(true);

    try {
      const token = await getAccessToken();
      const res = await fetch(
        mode === "create" ? "/api/links" : `/api/links/${initialData?.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            slug,
            destination_url: destination,
            mode: modeValue,
            status,
          }),
        },
      );

      if (!res.ok) {
        const json = await res.json();

        alert(json.message ?? "Failed to create link.");

        setSaving(false);

        return;
      }

      location.href = "/admin/links";
    } catch {
      alert("Network error.");

      setSaving(false);
    }
  }

  function copyPreview() {
    if (!preview) return;

    navigator.clipboard.writeText(preview);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <Input
          label="Short Link"
          placeholder="google"
          value={slug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          rightElement={
            <button
              type="button"
              onClick={handleGenerate}
              title="Generate random slug"
              className="
        rounded-lg
        p-2
        text-zinc-500
        transition
        hover:bg-zinc-100
        hover:text-zinc-900
        active:scale-95
      "
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
          onChange={(e) => setDestination(e.target.value)}
        />

        {destination && !isValidUrl(destination) && (
          <p className="text-sm text-red-600">Invalid URL.</p>
        )}

        <Select
          label="Mode"
          value={modeValue}
          onChange={(e) => setModeValue(e.target.value as "direct" | "flow")}
        >
          <option value="direct">Direct</option>

          <option value="flow">Flow</option>
        </Select>

        <OpenGraphCard
          value={ogMode}
          onChange={setOgMode}
          title={ogTitle}
          description={ogDescription}
          image={ogImage}
          onTitleChange={setOgTitle}
          onDescriptionChange={setOgDescription}
          onImageChange={setOgImage}
        />

        <div>
          <p className="mb-2 text-sm font-medium">Preview</p>

          <div className="flex flex-col gap-3 rounded-xl bg-zinc-100 p-4 md:flex-row md:items-center md:justify-between">
            <span className="break-all text-sm text-zinc-700">
              {preview || "https://domain.com/your-link"}
            </span>

            <Button type="button" onClick={copyPreview}>
              Copy
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="danger" onClick={() => history.back()}>
            Cancel
          </Button>

          <Button
            type="button"
            disabled={
              saving ||
              slugStatus !== "available" ||
              !destination ||
              !isValidUrl(destination)
            }
            onClick={handleSave}
          >
            {saving
              ? "Saving..."
              : mode === "create"
                ? "Create Link"
                : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
