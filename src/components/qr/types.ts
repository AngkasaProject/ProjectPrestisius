export type QRMode = "link" | "custom";

export interface LinkItem {
  id: string;
  slug: string;
  destination: string;
}
