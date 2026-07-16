export interface Link {
  id: string;
  slug: string;
  destination_url: string;
  mode: "direct" | "flow";
  status: boolean;

  og_mode: "destination" | "custom";
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;

  clicks: number;
  created_at: string;
  updated_at: string;
}
