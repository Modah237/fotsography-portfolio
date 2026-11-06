import { readFile, writeFile, mkdir } from "fs/promises";
import { createWriteStream, existsSync } from "fs";
import { pipeline } from "stream/promises";
import path from "path";

const RAW_DATA_PATH = "data/apify_raw_instagram.json";
const OUTPUT_DIR = "public/instagram-library";
const MANIFEST_PATH = "src/data/instagram-manifest.generated.json";
const WORKS_DATA_PATH = "src/data/instagram-works.generated.json";

async function downloadFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
  const fileStream = createWriteStream(destPath);
  await pipeline(res.body, fileStream);
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });

  const rawJson = JSON.parse(await readFile(RAW_DATA_PATH, "utf8"));
  console.log(`Processing ${rawJson.length} posts...`);

  const publishedWorks = [];

  for (let i = 0; i < rawJson.length; i++) {
    const post = rawJson[i];
    const shortCode = post.shortCode || post.id || `post_${i}`;
    console.log(`[${i + 1}/${rawJson.length}] Processing ${shortCode} (${post.type})...`);

    // Extract images
    const imagesToDownload = [];
    if (post.displayUrl) {
      imagesToDownload.push({ url: post.displayUrl, id: `${shortCode}_main` });
    }
    if (Array.isArray(post.childPosts)) {
      post.childPosts.forEach((child, cIdx) => {
        if (child.displayUrl) {
          imagesToDownload.push({ url: child.displayUrl, id: `${shortCode}_child_${cIdx}` });
        }
      });
    }
    if (Array.isArray(post.images)) {
      post.images.forEach((imgUrl, imgIdx) => {
        if (imgUrl && !imagesToDownload.some(it => it.url === imgUrl)) {
          imagesToDownload.push({ url: imgUrl, id: `${shortCode}_img_${imgIdx}` });
        }
      });
    }

    const downloadedImages = [];

    for (const item of imagesToDownload) {
      const filename = `${item.id}.jpg`;
      const localPath = path.join(OUTPUT_DIR, filename);

      try {
        if (!existsSync(localPath)) {
          console.log(`  Downloading image ${filename}...`);
          await downloadFile(item.url, localPath);
        } else {
          console.log(`  Existing image ${filename} reused.`);
        }
        downloadedImages.push({
          publicPath: `/instagram-library/${filename}`,
          filename,
        });
      } catch (err) {
        console.error(`  Error downloading ${item.url}:`, err.message);
      }
    }

    // Determine category
    const captionLower = (post.caption || "").toLowerCase();
    let category = "lifestyle";
    let categoryLabel = "Lifestyle & Voyages";

    if (captionLower.includes("mariage") || captionLower.includes("wedding") || captionLower.includes("bride")) {
      category = "weddings";
      categoryLabel = "Mariages & Célébrations";
    } else if (captionLower.includes("bts") || captionLower.includes("clip") || captionLower.includes("shoot") || captionLower.includes("video")) {
      category = "motion";
      categoryLabel = "Vidéos & Backstages";
    } else if (captionLower.includes("streetfashion") || captionLower.includes("photoshoot") || captionLower.includes("portrait")) {
      category = "fashion";
      categoryLabel = "Mode & Portraits";
    } else if (captionLower.includes("baptême") || captionLower.includes("anniversaire") || captionLower.includes("dior")) {
      category = "events";
      categoryLabel = "Événements Privés";
    }

    const primaryImage = downloadedImages[0]?.publicPath || "/cysoul_albertine_thumbnail.webp";

    const workItem = {
      id: shortCode,
      shortCode,
      type: post.type,
      caption: post.caption || "",
      category,
      categoryLabel,
      publishedAt: post.timestamp || new Date().toISOString(),
      url: post.url || `https://www.instagram.com/p/${shortCode}/`,
      primaryImage,
      allImages: downloadedImages.map(d => d.publicPath),
      likesCount: post.likesCount,
      videoUrl: post.videoUrl || null,
      mentions: post.mentions || [],
      hashtags: post.hashtags || [],
    };

    publishedWorks.push(workItem);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    account: "adrielfotsography",
    totalPosts: publishedWorks.length,
    works: publishedWorks,
  };

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  await writeFile(WORKS_DATA_PATH, JSON.stringify(publishedWorks, null, 2));

  console.log(`\n=== EXTRACTION COMPLÈTE TERMINÉE ===`);
  console.log(`Total œuvres enregistrées : ${publishedWorks.length}`);
  console.log(`Données prêtes dans : ${WORKS_DATA_PATH}`);
}

main().catch(console.error);
