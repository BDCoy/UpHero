import { NavigateFunction } from "react-router-dom";
import { supabase } from "../supabase";
import { getCurrentSubscription } from "../revolut";

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
  navigate: NavigateFunction
): Promise<boolean> => {
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    navigate("/signin");
    return false;
  }

  const userId = data.user.id;
  // Check if subscription exists & is active
  const subscription = await getCurrentSubscription(userId);

  if (!subscription || !subscription?.metadata?.endDate) {
    console.error("No subscription found");
    return false;
  }

  // Redirect if subscription state is NOT "completed" (an active subscription)
  if (subscription.state === "inactive") {
    return false;
  }

  // Check if subscription has expired
  const endDate = new Date(subscription.metadata.endDate);
  const now = new Date();

  if (now > endDate) {
    return false;
  }
  return true;
};
