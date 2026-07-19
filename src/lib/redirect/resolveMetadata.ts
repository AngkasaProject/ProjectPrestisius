import type { Link } from "@/types/link";
import type { OpenGraphMetadata } from "@/types/metadata";
import { getMetadata } from "@/lib/metadata";
import { getStorageUrl } from "@/lib/storage";

export async function resolveMetadata(link: Link): Promise<OpenGraphMetadata> {
  if (link.og_mode === "custom") {
    return {
      title: link.og_title || "Untitled",
      description: link.og_description || "",
      image: getStorageUrl(link.og_image_url),
      favicon: null,
    };
  }

  return await getMetadata(link.destination_url);
}
