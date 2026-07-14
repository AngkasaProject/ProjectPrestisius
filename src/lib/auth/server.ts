import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export async function getUserFromRequest(request: Request) {
  const auth = request.headers.get("authorization");

  if (!auth?.startsWith("Bearer ")) {
    return null;
  }

  const token = auth.replace("Bearer ", "");

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error) return null;

  return user;
}
