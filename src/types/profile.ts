export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  role: string;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}
