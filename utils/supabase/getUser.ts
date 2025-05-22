import { createClient } from "./client";

export async function getUser() {
  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw error;

  return session?.user ?? null;
}
