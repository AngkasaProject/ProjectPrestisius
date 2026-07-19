import { useMemo, useState } from "react";
import type { Link } from "@/types/link";
import { createLink } from "@/services/links/create";
import { updateLink } from "@/services/links/update";
import { validateLink } from "@/services/links/validation";
import OpenGraphCard from "./opengraph/OpenGraphCard";

import LinkBasicSection from "./sections/LinkBasicSection";
import LinkModeSection from "./sections/LinkModeSection";
import LinkPreviewSection from "./sections/LinkPreviewSection";
import LinkActionSection from "./sections/LinkActionSection";
import { slugify } from "@/services/slug/utils";

import { useSlug } from "@/hooks/useSlug";

type SlugStatus = "idle" | "checking" | "available" | "taken";

type Props = {
  origin: string;
  mode?: "create" | "edit";
  initialData?: Link;
};

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
  const [ogTitle, setOgTitle] = useState(initialData?.og_title ?? "");
  const [ogDescription, setOgDescription] = useState(
    initialData?.og_description ?? "",
  );
  const [ogImageUrl, setOgImageUrl] = useState<string | null>(
    initialData?.og_image_url ?? null,
  );
  const [ogImageId, setOgImageId] = useState<string | null>(
    initialData?.og_image_id ?? null,
  );
  const [ogImageFile, setOgImageFile] = useState<File | null>(null);
  const [ogMode, setOgMode] = useState<"destination" | "custom">(
    initialData?.og_mode ?? "destination",
  );

  const [destination, setDestination] = useState(
    initialData?.destination_url ?? "",
  );

  const [modeValue, setModeValue] = useState<"direct" | "flow">(
    initialData?.mode ?? "direct",
  );

  const [status] = useState(initialData?.status ?? true);

  const [saving, setSaving] = useState(false);

  const { slug, setSlug, slugStatus, generating, generate } = useSlug({
    initialSlug: initialData?.slug,
    mode,
  });

  const preview = useMemo(() => {
    if (!origin || !slug) return "";

    return `${origin}/${slug}`;
  }, [origin, slug]);
  async function handleSave() {
    if (saving) return;

    const validation = validateLink({
      slug,
      destination,
      slugStatus,
    });

    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    setSaving(true);

    try {
      if (mode === "create") {
        await createLink({
          slug,
          destination,
          mode: modeValue,
          status,

          ogMode,
          ogTitle,
          ogDescription,

          ogImage: ogImageFile,
          ogImageUrl,
          ogImageId,
        });
      } else {
        await updateLink({
          id: initialData!.id,

          slug,
          destination,
          mode: modeValue,
          status,

          ogMode,
          ogTitle,
          ogDescription,

          ogImage: ogImageFile,
          ogImageUrl,
          ogImageId,

          currentOgImageUrl: initialData?.og_image_url ?? null,
        });
      }

      location.href = "/admin/links";
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
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
        <LinkBasicSection
          slug={slug}
          destination={destination}
          generating={generating}
          slugStatus={slugStatus}
          onSlugChange={(value) => setSlug(slugify(value))}
          onDestinationChange={setDestination}
          onGenerate={generate}
        />
        {destination && !isValidUrl(destination) && (
          <p className="text-sm text-red-600">Invalid URL.</p>
        )}

        <LinkModeSection value={modeValue} onChange={setModeValue} />

        <OpenGraphCard
          value={ogMode}
          onChange={setOgMode}
          title={ogTitle}
          description={ogDescription}
          imageFile={ogImageFile}
          imageUrl={ogImageUrl}
          imageId={ogImageId}
          onTitleChange={setOgTitle}
          onDescriptionChange={setOgDescription}
          onImageFileChange={setOgImageFile}
          onImageUrlChange={setOgImageUrl}
          onImageIdChange={setOgImageId}
        />
        <LinkPreviewSection preview={preview} onCopy={copyPreview} />

        <LinkActionSection
          saving={saving}
          mode={mode}
          disabled={
            saving ||
            slugStatus !== "available" ||
            !destination ||
            !isValidUrl(destination)
          }
          onCancel={() => history.back()}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
