import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

// Initialize Supabase client with environment variables
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!, // Supabase URL
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // Supabase Service Key
);

serve(async (_req) => {
  const batchSize = 100;
  let offset = 0;
  let hasMore = true;
  const currentDate = new Date();

  while (hasMore) {
    const { data: subscriptions, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("state", "completed")
      .range(offset, offset + batchSize - 1);

    if (error) {
      console.error("Error fetching subscriptions:", error.message);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!subscriptions || subscriptions.length === 0) {
      hasMore = false;
      break;
    }

    // Process each subscription in the batch
    for (const subscription of subscriptions) {
      let isExpired = false;
      if (subscription.metadata?.endDate) {
        const endDate = new Date(subscription.metadata.endDate);
        isExpired = endDate.getTime() < currentDate.getTime();
      }

      if (isExpired) {
        const { error: updateError } = await supabase
          .from("subscriptions")
          .update({ state: "inactive" })
          .eq("id", subscription.id);
        if (updateError) {
          console.error(
            `Error updating subscription ${subscription.id}:`,
            updateError.message
          );
        } else {
          console.log(`Subscription ${subscription.id} marked as inactive.`);
        }
      }
    }

    offset += batchSize;
  }

  return new Response(
    JSON.stringify({ message: "Processing complete." }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
