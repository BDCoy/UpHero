import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

// Initialize Supabase client with environment variables
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!, // Supabase URL
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // Supabase Service Key
);

serve(async (req) => {
  try {
    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      return new Response("ok", {
        headers: corsHeaders,
      });
    }

    // Handle other requests (e.g., POST)
    if (req.method === "POST") {
      // Get the JSON body of the request
      const { user_id } = await req.json();

      // 1. Delete the user's subscriptions
      const { error: subscriptionsError } = await supabase
        .from("subscriptions")
        .delete()
        .eq("user_id", user_id);

      if (subscriptionsError) {
        return new Response(
          JSON.stringify({
            error: "Failed to delete subscriptions",
            details: subscriptionsError,
          }),
          { status: 500, headers: corsHeaders }
        );
      }

      // 2. Delete avatar image from storage if it exists
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user_id)
        .single();

      if (profileError) {
        return new Response(
          JSON.stringify({
            error: "Failed to find user profile",
            details: profileError,
          }),
          { status: 500, headers: corsHeaders }
        );
      }

      // Remove avatar image from Supabase storage if avatar_url exists
      if (profileData?.avatar_url) {
        const fileName = profileData.avatar_url.split("/").pop();
        await supabase.storage.from("avatars").remove([fileName]);
      }

      // 3. Delete the user's profile from profiles table
      const { error: deleteProfileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user_id);

      if (deleteProfileError) {
        return new Response(
          JSON.stringify({
            error: "Failed to delete user profile",
            details: deleteProfileError,
          }),
          { status: 500, headers: corsHeaders }
        );
      }

      // 4. Soft delete the user record from the auth.users table
      const { error: deleteUserError } = await supabase.auth.admin.deleteUser(
        user_id
      ); // Soft delete

      if (deleteUserError) {
        return new Response(
          JSON.stringify({
            error: "Failed to delete user from auth",
            details: deleteUserError,
          }),
          { status: 500, headers: corsHeaders }
        );
      }

      // Return success response
      return new Response(
        JSON.stringify({
          message: "Account and related data successfully deleted",
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    // If request method is not OPTIONS or POST, return an error
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
