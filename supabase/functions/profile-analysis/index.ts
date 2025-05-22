import * as cheerio from "https://cdn.skypack.dev/cheerio?dts";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req: Request) => {
  try {
    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      return new Response("ok", {
        headers: corsHeaders,
      });
    }
    if (req.method === "POST") {
      // Parse the JSON body from the incoming request.
      const { url } = await req.json();
      if (!url) {
        return new Response(
          JSON.stringify({ error: "Missing 'url' in request body" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Validate that the URL begins with the expected Upwork freelancers base path.
      const baseUrl = "https://www.upwork.com/freelancers/";
      if (!url.startsWith(baseUrl)) {
        return new Response(
          JSON.stringify({
            error: `Invalid URL. It must start with "${baseUrl}".`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Fetch the static HTML content using the built-in fetch.
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });
      const html = await res.text();

      // Use Cheerio to load the HTML.
      const $ = cheerio.load(html);

      const name = $("h2").eq(0).text().trim(); // First <h2> as name
      const headline = $("h2").eq(1).text().trim(); // Second <h2> as headline
      const body = $("span[data-v-09620418]").eq(3).text().trim();
      const profileImageSrc = $("img.air3-avatar").attr("src") || ""; // Profile image source
      const hourlyRate = $("span[data-v-09620418]").eq(2).text().trim();
      const country = $("span[itemprop='country-name']").text().trim();
      const totalHours = $("div.stat-amount").eq(1).text().trim(); // Total hours worked
      const totalJobs = $("div.stat-amount").eq(0).text().trim(); // Total jobs

      // Log extracted data for debugging
      console.log({
        name,
        headline,
        body,
        profileImageSrc,
        hourlyRate,
        country,
        totalHours,
        totalJobs,
      });

      // Prepare the extracted data into an object
      const freelancerData = {
        Name: name,
        Headline: headline,
        Body: body,
        ProfileImageSrc: profileImageSrc,
        HourlyRate: hourlyRate,
        TotalJobs: totalJobs,
        Country: country,
        TotalHours: totalHours,
        ProfileURL: url, // Add the profile URL to the results
      };
      // Return the extracted data as JSON
      return new Response(JSON.stringify(freelancerData), {
        status: 200,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
  } catch (error) {
    // Return any errors encountered during processing.
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
