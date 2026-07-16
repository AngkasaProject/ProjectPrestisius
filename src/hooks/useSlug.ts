import { useEffect, useState } from "react";
import { generateRandomSlug } from "@/services/slug/utils";
import { checkSlug } from "@/services/slug/check";

export type SlugStatus = "idle" | "checking" | "available" | "taken";

type Props = {
  initialSlug?: string;
  mode: "create" | "edit";
};

export function useSlug({ initialSlug = "", mode }: Props) {
  const [slug, setSlug] = useState(initialSlug);

  const [slugStatus, setSlugStatus] = useState<SlugStatus>("idle");

  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!slug) {
      setSlugStatus("idle");
      return;
    }

    if (mode === "edit" && slug === initialSlug) {
      setSlugStatus("available");
      return;
    }

    const timeout = setTimeout(async () => {
      setSlugStatus("checking");

      try {
        const json = await checkSlug(slug);

        setSlugStatus(json.available ? "available" : "taken");
      } catch {
        setSlugStatus("taken");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [slug, initialSlug, mode]);

  async function generate() {
    setGenerating(true);

    setSlugStatus("checking");

    while (true) {
      const random = generateRandomSlug();

      try {
        const json = await checkSlug(random);

        if (json.available) {
          setSlug(random);

          setSlugStatus("available");

          break;
        }
      } catch {
        break;
      }
    }

    setGenerating(false);
  }

  return {
    slug,
    setSlug,

    slugStatus,

    generating,

    generate,
  };
}
