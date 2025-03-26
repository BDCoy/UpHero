import { supabase } from "../supabase";
import { PAYMENT_STATE, RevolutOrder, RevolutSubscription } from "./types";

export const registerSubscription = async (
  userId: string,
  order: RevolutOrder
) => {
  try {
    const { error } = await supabase.from("subscriptions").insert([
      {
        user_id: userId,
        revolut_order_id: order.id,
        payment_token: order.token,
        amount: order.amount,
        currency: order.currency,
        state: order.state,
        selected_plan: order.metadata.selectedPlan,
        checkout_url: order.checkout_url,
        metadata: order.metadata,
      },
    ]);

    if (error) {
      console.error("Error registering subscription:", error);
      return { success: false, error: error.message };
    }

    console.log("Subscription registered successfully");
    return { success: true };
  } catch (err) {
    console.error("An error occurred in registerSubscription:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};

export const modifySubscriptionStatus = async (
  orderId: string,
  newState: string
) => {
  try {
    const { error } = await supabase
      .from("subscriptions")
      .update({
        state: newState,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .eq("revolut_order_id", orderId);

    if (error) {
      console.error("Error modifying subscription status:", error);
      return { success: false, error: error.message };
    }

    console.log(`Subscription status modified to ${newState}`);
    return { success: true };
  } catch (err) {
    console.error("An error occurred in modifySubscriptionStatus:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};

export const getLatestPendingSubscription = async (
  selectedPlan: string
): Promise<RevolutSubscription | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("Please sign in to continue");
    return null;
  }

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("state", "pending") // Filter by state = 'pending'
    .eq("selected_plan", selectedPlan) // Filter by selected plan
    .eq("user_id", user.id) // Filter by user ID
    .order("created_at", { ascending: false }) // Get the latest
    .limit(1)
    .single(); // Ensure a single result

  if (error) {
    console.error("Error fetching subscription:", error);
    return null;
  }

  return data ?? null;
};

export const verifyPaymentStatus = async (
  orderId: string
): Promise<PAYMENT_STATE> => {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("state")
      .eq("revolut_order_id", orderId)
      .single();

    if (error) {
      console.error("Error fetching subscription:", error);
      throw new Error(error.message); // Throw an error to be caught in the catch block
    }

    if (!data) {
      console.error("Subscription not found for order ID:", orderId);
      return "failed"; // Return default state if no data is found
    }

    const paymentState: PAYMENT_STATE = data.state; // Assign the state to the correct type
    return paymentState;
  } catch (error) {
    console.error("Error verifying payment status:", error);
    return "failed"; // Return a default state in case of an error
  }
};

export const getCurrentSubscription = async (
  userId: string
): Promise<RevolutSubscription | null> => {

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .neq("state", "pending")
    .neq("state", "processing")
    .neq("state", "authorised")
    .neq("state", "failed")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching current subscription:", error);
    return null;
  }

  return data ?? null;
};
