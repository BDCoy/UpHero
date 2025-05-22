import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .maybeSingle();

  return subscription;
});

export const getProducts = cache(async (supabase: SupabaseClient) => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  return products;
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
  const { data: userDetails } = await supabase
    .from("users")
    .select("*")
    .single();
  return userDetails;
});

export const checkSubscriptionStatus = async (
  userId: string,
  subscription: any,
  supabase: SupabaseClient,
  analysisType:
    | "profile_analysis_count"
    | "cover_letter_count"
    | "ats_optimizer_count"
    | "proposal_generator_count"
    | "client_messages_count"
): Promise<boolean> => {

  if (!subscription) {
    console.error("No subscription found");
    return false;
  }
  // Check if subscription is actve
  if (subscription.status !== "active") {
    return false;
  }

  // Check if subscription has expired
  const endDate = new Date(subscription.current_period_end);
  const now = new Date();

  if (now > endDate) {
    return false;
  }

  // Check limits

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select(analysisType)
    .eq("id", userId)
    .single();

  if (profileError) {
    return false;
  }

  const metadata = subscription?.prices?.products?.metadata;


  const count =
    (profile as Record<typeof analysisType, number>)[analysisType] || 0;

  switch (analysisType) {
    case "profile_analysis_count":
      if (count >= metadata?.profile_analysis_limit) {
        return false;
      }

      break;
    case "cover_letter_count":
      if (count >= metadata?.cover_letter_limit) {
        return false;
      }
      break;
    case "ats_optimizer_count":
      if (count >= metadata?.ats_optimizer_limit) {
        return false;
      }
      break;
    case "proposal_generator_count":
      if (count >= metadata?.proposal_generator_limit) {
        return false;
      }
      break;
    case "client_messages_count":
      if (count >= metadata?.client_messages_limit) {
        return false;
      }
      break;
    default:
      return true;
  }
  return true;
};
