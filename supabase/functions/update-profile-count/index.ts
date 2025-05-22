/* eslint-disable @typescript-eslint/no-unused-vars */
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

// Initialize Supabase client with environment variables
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!, // Supabase URL
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // Supabase Service Key
);

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
    const { analysisType, user_id, new_count } = await req.json();
    // Update the count for the specified analysis type with the new count
    const { error } = await supabase
      .from("users")
      .update({
        [analysisType]: new_count, // Use the new count passed in the request
      })
      .eq("id", user_id); // Use the passed user_id

    console.log(error);

    if (error) {
      return new Response("Error updating profile", { status: 500 });
    }

    return new Response("Profile count updated successfully", {
      status: 200,
      headers: corsHeaders, // Include CORS headers in the response
    });
  } catch (error) {
    return new Response("Internal server error", {
      status: 500,
      headers: corsHeaders, // Include CORS headers in the response
    });
  }
});
