const APIFY_TOKEN = process.env.APIFY_TOKEN || "";
const ACTOR_ID = "apify~instagram-scraper";

async function run() {
  console.log("Calling Apify for @adrielfotsography...");
  try {
    const response = await fetch(
      `https://api.apify.com/v2/acts/${ACTOR_ID}/run-sync-get-dataset-items?token=${encodeURIComponent(APIFY_TOKEN)}&timeout=120`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          directUrls: ["https://www.instagram.com/adrielfotsography/"],
          resultsType: "posts",
          resultsLimit: 12,
        }),
      }
    );

    if (!response.ok) {
      console.error(`Apify error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error(text);
      return;
    }

    const items = await response.json();
    console.log(`Fetched ${items.length} items from Instagram via Apify!`);
    if (items.length > 0) {
      console.log("First item sample:", JSON.stringify(items[0], null, 2).slice(0, 500));
      const fs = await import("fs/promises");
      await fs.writeFile("data/apify_raw_instagram.json", JSON.stringify(items, null, 2));
    }
  } catch (err) {
    console.error("Execution error:", err);
  }
}

run();
