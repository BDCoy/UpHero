import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import {
  prodApiUrl,
  sandboxApiUrl,
  SUBSCRIPTION_PLANS,
} from "../_shared/constants.ts";
import { PLAN_IDS, RevolutOrder, RevolutSubscription } from "../_shared/interfaces.ts";

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!, // Your Supabase URL
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // Your Supabase Service Key (from API settings)
);

// Get environment (dev or prod) from the environment variables
const environment = Deno.env.get("ENVIRONMENT");

const isProd = environment === "production";

const apiUrl = isProd ? prodApiUrl : sandboxApiUrl; // Use prod or sandbox URL based on environment

// Get the correct Revolut credentials based on environment
const revolutSecretKey = isProd
  ? Deno.env.get("VITE_REVOLUT_PROD_SECRET_KEY")
  : Deno.env.get("VITE_REVOLUT_DEV_SECRET_KEY");

export async function updateSubscriptionStatus(
  id: string,
  newOrder: RevolutOrder,
  newState: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      revolut_order_id: newOrder.id,
      payment_token: newOrder.token,
      amount: newOrder.amount,
      currency: newOrder.currency,
      state: newState,
      selected_plan: newOrder.metadata.selectedPlan,
      checkout_url: newOrder.checkout_url,
    };
    const { error } = await supabase
      .from("subscriptions")
      .update({ ...payload, updated_at: new Date(), created_at: new Date() })
      .eq("id", id);

    if (error) {
      console.error("Error updating subscription status:", error);
      return { success: false, error: error.message };
    }

    console.log(`Subscription status updated to ${newState}`);
    return { success: true };
  } catch (err) {
    console.error("An error occurred in updateSubscriptionStatus:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

// Function to retrieve the payment methods associated with a specific order
const getPaymentMethodsForOrder = async (orderId: string) => {
  try {
    const response = await fetch(`${apiUrl}/orders/${orderId}/payments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${revolutSecretKey}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch payment methods: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data.length && data[0].payment_method; // This will return the payment methods associated with the order
  } catch (error) {
    throw new Error(
      `Failed to fetch payment methods for order: ${error.message}`
    );
  }
};

const getOrderDetails = async (orderId: string): Promise<string> => {
  try {
    const response = await fetch(`${apiUrl}/orders/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${revolutSecretKey}`,
        "Revolut-Api-Version": "2024-09-01",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch order details: ${response.statusText}`);
    }

    const data: RevolutOrder = await response.json();
    return data.customer.id;
  } catch (error) {
    throw new Error(`Failed to get order details: ${error.message}`);
  }
};

const createSubscriptionOrder = async (orderData: {
  amount: number;
  currency: string;
  customerId: string;
  metadata: {
    selectedPlan: PLAN_IDS
    endDate: string;
    email?: string;
    user_id?: string;
  };
}): Promise<RevolutOrder> => {
  try {
    const payload = {
      amount: orderData.amount,
      currency: orderData.currency,
      capture_mode: "automatic", // Set the capture mode to "automatic"
      customer: {
        id: orderData.customerId, // Use the customer ID
      },
      metadata: orderData.metadata,
    };

    const response = await fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Revolut-Api-Version": "2024-09-01",
        Authorization: `Bearer ${revolutSecretKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.statusText}`);
    }

    const data: RevolutOrder = await response.json();
    return data; // Return the created order data
  } catch (error) {
    throw new Error(`Failed to create order in Revolut: ${error.message}`);
  }
};

const payForOrder = async (orderId: string, savedPaymentMethod: any) => {
  try {
    const response = await fetch(`${apiUrl}/orders/${orderId}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${revolutSecretKey}`,
        "Revolut-Api-Version": "2024-09-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ saved_payment_method: savedPaymentMethod }),
    });

    if (!response.ok) {
      throw new Error(`Failed to pay for order: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to pay for order: ${error.message}`);
  }
};

// Define the Edge function
serve(async (req) => {
  try {
    console.log(environment, apiUrl);
    // Fetch inactive subscriptions with 'free' selected plan
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("state", "inactive");

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const subscriptions: RevolutSubscription[] = data;

    console.log(subscriptions.length);

    // Iterate over the subscriptions to process them
    const errors: string[] = []; // Collect errors to return them at the end, if any

    for (const subscription of subscriptions) {
      try {
        const customerId = await getOrderDetails(subscription.revolut_order_id);

        console.log(
          `Customer ID for order ${subscription.revolut_order_id}: ${customerId}`
        );

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("email")
          .eq("id", subscription.user_id)
          .single(); // Assuming user_id is unique

        if (profileError || !profile) {
          throw new Error(
            `Failed to fetch email for user ${subscription.user_id}: ${profileError?.message}`
          );
        }
        console.log("Subscription", subscription.revolut_order_id);
        // Fetch the payment methods associated with the order
        const paymentMethodsResponse = await getPaymentMethodsForOrder(
          subscription.revolut_order_id
        );
        console.log("Payment method", paymentMethodsResponse);

        const savedPaymentMethod = {
          id: paymentMethodsResponse.id, // This should be dynamically fetched or passed as required
          type: paymentMethodsResponse.type,
          initiator: "merchant",
        };

        const endDate = new Date();
        let totalMonths;
        if (subscription.selected_plan === "pro") {
          totalMonths = 1;
        } else if (subscription.selected_plan === "pro_3months") {
          totalMonths = 3;
        }
        endDate.setMonth(endDate.getMonth() + totalMonths); // Add 1 month to the current date
        const endDateString = endDate.toISOString(); // Convert to ISO string

        // Create the metadata object with required details
        const metadata = {
          endDate: endDateString, // Date 1 month from today
          user_id: subscription.user_id, // Assuming user_id is stored in the subscription
          email: profile.email, // Email fetched from profiles table
          selectedPlan: subscription.selected_plan, // Set to "monthly" as requested
        };
        const proPlan = SUBSCRIPTION_PLANS[1];
        const orderData = {
          amount:
            subscription.selected_plan === "free"
              ? proPlan.price
              : subscription.amount, // Amount in the currency (e.g., USD)
          currency: "USD", // Currency of the payment
          customerId,
          metadata,
        };

        console.log("metadata:", metadata);

        console.log("order data:", orderData);

        const createdOrder = await createSubscriptionOrder(orderData);

        const paymentResponse = await payForOrder(
          createdOrder.id,
          savedPaymentMethod
        );
        console.log(`Payment response: ${JSON.stringify(paymentResponse)}`);

        await updateSubscriptionStatus(
          subscription.id,
          createdOrder,
          "processing"
        );
      } catch (err) {
        // Handle any error that occurred while processing this subscription
        errors.push(
          `Error processing subscription ${subscription.id}: ${err.message}`
        );
      }
    }

    // If there were any errors, return them in the response
    if (errors.length > 0) {
      return new Response(
        JSON.stringify({
          message: "Some subscriptions encountered errors.",
          errors,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // If no errors, return success response
    return new Response(
      JSON.stringify({
        message: "Subscriptions renewed and payments processed.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    // Handle unexpected errors
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
