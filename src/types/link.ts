export interface Link {
  id: string;
  slug: string;
  destination_url: string;
  mode: "direct" | "flow";
  status: boolean;
  clicks: number;
  created_at: string;
  updated_at: string;
}
