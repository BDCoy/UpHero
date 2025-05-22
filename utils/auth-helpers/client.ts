"use client";

import { createClient } from "@/utils/supabase/client";
import { type Provider } from "@supabase/supabase-js";
import { getURL } from "@/utils/helpers";
import { redirectToPath } from "./server";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function handleRequest(
  e: React.FormEvent<HTMLFormElement>,
  requestFunc: (formData: FormData) => Promise<string>,
  router: AppRouterInstance | null = null
): Promise<boolean | void> {
  // Prevent default form submission refresh
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const redirectUrl: string = await requestFunc(formData);

  if (router) {
    // If client-side router is provided, use it to redirect
    return router.push(redirectUrl);
  } else {
    // Otherwise, redirect server-side
    return await redirectToPath(redirectUrl);
  }
}

export async function signInWithOAuth(e: React.FormEvent<HTMLFormElement>) {
  // Prevent default form submission refresh
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const provider = String(formData.get("provider")).trim() as Provider;

  // Create client-side supabase client and call signInWithOAuth
  const supabase = createClient();
  const redirectURL = getURL("/auth/callback");
  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectURL,
    },
  });
}

export const checkUserStatus = async (
  router: AppRouterInstance,
  setLoading: (loading: boolean) => void
) => {
  const supabase = createClient();
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.push("/signin");
      return;
    }

    const userId = data.user.id;

    //  Check if signup is completed
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("signup_completed")
      .eq("id", userId)
      .single();

    if (profileError || !profile?.signup_completed) {
      router.push("/signin/signup");
      return;
    }
  } catch (error) {
    console.error("Error checking user status:", error);
    router.push("/signin");
    return;
  } finally {
    setLoading(false);
  }
};
