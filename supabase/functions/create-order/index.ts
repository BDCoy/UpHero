import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { PLAN_IDS, RevolutOrder } from "../_shared/interfaces.ts";
import { sandboxApiUrl, prodApiUrl } from "../_shared/constants.ts";
import { User } from "npm:@supabase/supabase-js@2";

/**
 * Creates a new order in the Revolut payment system.
 *
 * This function sends a request to the Revolut API to create a new payment order. The function handles both free and paid orders,
 * adjusting the `capture_mode` accordingly, and includes metadata like the user's email and selected plan.
 *
 * @param {number} amount - The amount to be charged in the smallest unit of the currency (e.g., cents).
 * @param {string} currency - The currency for the payment (e.g., "USD", "EUR").
 * @param {User} user - The user details, including their email, who is making the payment.
 * @param {Object} metadata - Additional data to attach to the payment order, including `selectedPlan`, `endDate`, `email`, and `user_id`.
 * @param {boolean} [isManual=false] - A flag to indicate whether the order is manual or automatic for capture payments. Defaults to false.
 * @param {string} revolutSecretKey - The Revolut API secret key for authorization.
 * @param {string} apiUrl - The API URL (sandbox or production) for Revolut.
 *
 * @returns {Promise<RevolutOrder>} - The created order data from Revolut.
 *
 * @throws {Error} - Throws an error if the API request fails or the response status is not OK.
 */
const createOrder = async (
  amount: number,
  currency: string,
  user: User,
  metadata: {
    selectedPlan: PLAN_IDS
    endDate: string;
    email?: string;
    user_id?: string;
  },
  isManual: boolean = false,
  revolutSecretKey: string,
  apiUrl: string
): Promise<RevolutOrder> => {
  try {
    // Make a POST request to the Revolut API to create an order
    const response = await fetch(apiUrl + "/orders", {
      method: "POST", // HTTP method
      headers: {
        Authorization: `Bearer ${revolutSecretKey}`,
        "Revolut-Api-Version": "2024-09-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents and ensure it's an integer
        currency,
        capture_mode: !isManual ? "automatic" : "manual", // Set capture mode
        customer: {
          email: user.email, // Attach user's email to the order
        },
        metadata, // Attach the provided metadata to the order
      }),
    });

    // If the response is not successful (status not OK), throw an error
    if (!response.ok) {
      throw new Error(
        `Failed to create Revolut order, status: ${response.status}`
      );
    }

    // Return the order data as a JSON object
    return await response.json();
  } catch (error) {
    // Log any errors and rethrow a custom error message
    console.error("Error creating Revolut order:", error);
    throw new Error("Failed to create Revolut order");
  }
};

/**
 * Edge function to handle HTTP requests for creating a new payment order.
 *
 * This function supports two types of requests:
 * 1. **CORS preflight (OPTIONS)** - Handles the preflight request by returning the CORS headers.
 * 2. **POST** - Handles order creation by calling the `createOrder` function and returns the created order data.
 *
 * @param {Request} req - The incoming HTTP request object.
 *
 * @returns {Response} - The HTTP response, either containing the created order data or an error message.
 */
serve(async (req) => {
  // Handle CORS preflight (OPTIONS) request
  if (req.method === "OPTIONS") {
    // Return a response with the appropriate CORS headers for preflight requests
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    // Parse the incoming JSON request body
    const {
      amount = 0, // Default to 0 if not provided
      currency, // The currency for the payment
      user, // The user requesting the order
      metadata, // The metadata associated with the order (including selected plan and end date)
      isManual = false, // Default to false if not provided (i.e., assume it's a automatic order)
      environment, // The environment ("production" or "sandbox")
    } = await req.json();

    // Determine the Revolut API URL and secret key based on the environment
    const isProd = environment === "production";
    const apiUrl = isProd ? prodApiUrl : sandboxApiUrl;
    const revolutSecretKey = isProd
      ? Deno.env.get("REVOLUT_PROD_SECRET_KEY")
      : Deno.env.get("REVOLUT_DEV_SECRET_KEY");

    // Throw an error if the Revolut secret key is missing
    if (!revolutSecretKey) {
      throw new Error(
        `Revolut secret key not found for environment: ${environment}`
      );
    }

    // Call the createOrder function to create a new order
    const order = await createOrder(
      amount,
      currency,
      user,
      metadata,
      isManual,
      revolutSecretKey,
      apiUrl
    );

    // Return a successful response with the order data
    return new Response(
      JSON.stringify({
        message: "Order created successfully",
        order, // Return the created order data
      }),
      {
        status: 200, // HTTP status code for success
        headers: { ...corsHeaders, "Content-Type": "application/json" }, // Include CORS headers
      }
    );
  } catch (err) {
    // Handle errors and return an error response
    console.error("Error handling request:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, // HTTP status code for internal server error
      headers: { ...corsHeaders, "Content-Type": "application/json" }, // Include CORS headers
    });
  }
});
