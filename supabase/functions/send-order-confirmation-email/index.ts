import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { resendApiUrl } from "../_shared/constants.ts";
import { paymentConfirmationTemplate } from "../_shared/email_templates.ts";
import { corsHeaders } from "../_shared/cors.ts";

// Resend API key (replace with your actual key)
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    // Return a response with the appropriate CORS headers for preflight requests
    return new Response("ok", {
      headers: corsHeaders,
    });
  }
  try {
    const { name, email, order_id, amount, plan, is_free_trial } =
      await req.json();

    const payload = paymentConfirmationTemplate(
      name,
      order_id,
      amount,
      plan,
      is_free_trial
    );

    // Send confirmation email using Resend API
    const emailResponse = await fetch(resendApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "UpHero Team <payments@uphero.io>",
        to: [email],
        subject: `Payment Confirmation for UpHero`,
        html: payload,
      }),
    });

    // Check if the email was sent successfully
    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      return new Response(JSON.stringify(errorData), {
        status: 500,
        headers: corsHeaders,
      });
    }

    // Return a success response
    return new Response(
      JSON.stringify({
        message: "Payment confirmation email sent successfully",
      }),
      {
        status: 200,
        headers: corsHeaders, // Include CORS headers in the response
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response("Internal server error", {
      status: 500,
      headers: corsHeaders, // Include CORS headers in the response
    });
  }
});
