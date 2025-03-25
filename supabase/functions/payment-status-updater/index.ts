/**
 * Supabase Edge Function for handling Revolut Webhooks
 *
 * This function listens for incoming POST requests from Revolut,
 * extracts event data, determines the new subscription state, and
 * updates the corresponding record in the Supabase database.
 */

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { prodApiUrl, sandboxApiUrl } from "../_shared/constants.ts";

// Initialize Supabase client with environment variables
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!, // Supabase URL
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // Supabase Service Key
);

// Detect environment and set API URL accordingly
const environment = Deno.env.get("ENVIRONMENT");
const isProd = environment === "production";
const apiUrl = isProd ? prodApiUrl : sandboxApiUrl;

/**
 * Handles incoming webhook requests
 *
 * @param {Request} req - The incoming request object
 * @returns {Response} - The HTTP response object
 */
serve(async (req) => {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // Parse JSON payload
    const body = await req.json();

    console.log("ENV:", environment);
    console.log("API URL:", apiUrl);
    console.log("Webhook Payload:", body);

    // Extract relevant data from the webhook payload
    const eventType = body.event; // e.g., "ORDER_COMPLETED"
    const orderId = body.order_id; // e.g., "12345678-..."

    if (!eventType || !orderId) {
      return new Response(
        JSON.stringify({ error: "Missing event or order_id in payload." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let newState:
      | "pending"
      | "processing"
      | "authorised"
      | "completed"
      | "cancelled"
      | "failed"; // No changes to the valid states

    switch (eventType) {
      case "ORDER_COMPLETED":
      case "ORDER_AUTHORISED":
      case "ORDER_PAYMENT_AUTHENTICATED":
        newState = "completed"; // For these events, set state to 'completed'
        break;

      case "ORDER_CANCELLED":
        newState = "cancelled"; // For ORDER_CANCELLED event, set state to 'cancelled'
        break;

      case "ORDER_PAYMENT_FAILED":
      case "ORDER_PAYMENT_DECLINED":
        newState = "failed"; // For failed payment events, set state to 'failed'
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`); // Log any unhandled event type
        newState = "failed"; // Default to 'failed' for unhandled events
        break;
    }
    // Step 1: Update the subscription state
    if (newState) {
      const { error: subscriptionUpdateError } = await supabase
        .from("subscriptions")
        .update({ state: newState })
        .eq("revolut_order_id", orderId);

      if (subscriptionUpdateError) {
        console.error("Error updating subscription:", subscriptionUpdateError);
        return new Response(
          JSON.stringify({ error: subscriptionUpdateError.message }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Step 2: Get the subscription info (to get user_id)
      const { data: subscriptionData, error: subscriptionFetchError } =
        await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("revolut_order_id", orderId)
          .single();

      if (subscriptionFetchError) {
        console.error(
          "Error fetching subscription user_id:",
          subscriptionFetchError
        );
        return new Response(
          JSON.stringify({ error: subscriptionFetchError.message }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      if (newState === "completed") {
        const userId = subscriptionData.user_id;

        const { error: profileUpdateError } = await supabase
          .from("profiles")
          .update({
            profile_analysis_count: 0,
            ats_optimizer_count: 0,
            proposal_generator_count: 0,
            cover_letter_count: 0,
            client_messages_count: 0,
          })
          .eq("id", userId);

        if (profileUpdateError) {
          console.error(
            "Error updating profile usage counters:",
            profileUpdateError
          );
          return new Response(
            JSON.stringify({ error: profileUpdateError.message }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: "Webhook received and subscription updated." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
