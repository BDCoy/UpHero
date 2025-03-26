import { NavigateFunction } from "react-router-dom";
import { supabase } from "../supabase";
import { getCurrentSubscription, SUBSCRIPTION_PLANS } from "../revolut";

/**
 * Checks if the user is authenticated, their signup is complete,
 * and their subscription is active.
 */
export const checkUserStatus = async (
  navigate: NavigateFunction,
  setLoading: (loading: boolean) => void
) => {
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      navigate("/signin");
      return;
    }

    const userId = data.user.id;

    //  Check if signup is completed
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("signup_completed")
      .eq("id", userId)
      .single();

    if (profileError || !profile?.signup_completed) {
      navigate("/signup");
      return;
    }
  } catch (error) {
    console.error("Error checking user status:", error);
    navigate("/signin");
    return;
  } finally {
    setLoading(false);
  }
};

export const checkSubscriptionStatus = async (
  userId: string,
  analysisType:
    | "profile_analysis_count"
    | "cover_letter_count"
    | "ats_optimizer_count"
    | "proposal_generator_count"
    | "client_messages_count"
): Promise<boolean> => {
  // Check if subscription exists & is active
  const subscription = await getCurrentSubscription(userId);

  if (!subscription || !subscription?.metadata?.endDate) {
    console.error("No subscription found");
    return false;
  }

  // Redirect if subscription state is NOT "completed" (an active subscription)
  if (
    subscription.state === "inactive" ||
    subscription.state === "failed" ||
    subscription.state === "pending"
  ) {
    return false;
  }

  // Check if subscription has expired
  const endDate = new Date(subscription.metadata.endDate);
  const now = new Date();

  if (now > endDate) {
    return false;
  }

  // Check limits
  const selectedPlan = SUBSCRIPTION_PLANS.find(
    (plan) => plan.id === subscription?.selected_plan
  );

  if (!selectedPlan) return false;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(analysisType)
    .eq("id", userId)
    .single();

  if (profileError) {
    return false;
  }

  const count =
    (profile as Record<typeof analysisType, number>)[analysisType] || 0;

  switch (analysisType) {
    case "profile_analysis_count":
      if (count >= selectedPlan.profile_analysis_limit) {
        return false;
      }

      break;
    case "cover_letter_count":
      if (count >= selectedPlan.cover_letter_limit) {
        return false;
      }
      break;
    case "ats_optimizer_count":
      if (count >= selectedPlan.ats_optimizer_limit) {
        return false;
      }
      break;
    case "proposal_generator_count":
      if (count >= selectedPlan.proposal_generator_limit) {
        return false;
      }
      break;
    case "client_messages_count":
      if (count >= selectedPlan.client_messages_limit) {
        return false;
      }
      break;
    default:
      return true;
  }
  return true;
};
