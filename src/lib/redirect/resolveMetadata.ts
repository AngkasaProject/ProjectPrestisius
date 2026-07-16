import type { Link } from "@/types/link";
import type { OpenGraphMetadata } from "@/types/metadata";
import { getMetadata } from "@/lib/metadata";

export async function resolveMetadata(link: Link): Promise<OpenGraphMetadata> {
  console.log("OG MODE:", link.og_mode);

  if (link.og_mode === "custom") {
    console.log("USING CUSTOM OG");

    return {
      title: link.og_title || "Untitled",
      description: link.og_description || "",
      image: link.og_image_url,
      favicon: null,
    };
  }

  console.log("USING DESTINATION OG");

  return await getMetadata(link.destination_url);
}
