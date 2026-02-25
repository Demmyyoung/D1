/**
 * Seed script — migrates existing static model data to Sanity
 *
 * Run once after Sanity project setup:
 *   node scripts/seed-sanity.mjs
 *
 * Requires:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local
 *   SANITY_API_TOKEN with write access (create in Sanity dashboard → API → Tokens)
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Read .env.local manually (avoids needing dotenv as a dependency)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
envContent.split("\n").forEach((line) => {
  const [key, ...vals] = line.split("=");
  if (key && vals.length) process.env[key.trim()] = vals.join("=").trim();
});

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ----- Static data (copied from src/data/models.js) -----
const models = [
  {
    slug: "damilare",
    name: "Damilare",
    tagline: "Model · Creative · Muse",
    bio: "Lagos-based model with a passion for editorial and high-fashion work. Currently represented by select agencies across West Africa. Open to international bookings.",
    stats: {
      height: '5\'10"',
      bust: '32"',
      waist: '24"',
      hips: '35"',
      shoe: "9 US",
      eyes: "Brown",
      hair: "Black",
    },
    agency: "Independent",
    location: "Lagos, Nigeria",
    contact: "bookings@damilare.com",
    joined: "February 2026",
    photos: [
      { caption: "Studio session — natural light", date: "2026-02-20", album: "Studio" },
      { caption: "Editorial look", date: "2026-02-19", album: "Studio" },
      { caption: "On location", date: "2026-02-15", album: "On Location" },
      { caption: "Golden hour portrait", date: "2026-02-10", album: "Portraits" },
      { caption: "Campaign shoot", date: "2026-02-05", album: "Campaigns" },
      { caption: "Behind the scenes", date: "2026-01-28", album: "Campaigns" },
      { caption: "Monochrome series", date: "2026-01-20", album: "Portraits" },
    ],
  },
  {
    slug: "amara",
    name: "Amara",
    tagline: "Runway · Editorial · Campaign",
    bio: "International model based between Lagos and London. Known for editorial and high-fashion runway work.",
    stats: {
      height: '5\'11"',
      bust: '33"',
      waist: '25"',
      hips: '36"',
      shoe: "10 US",
      eyes: "Dark Brown",
      hair: "Black",
    },
    agency: "Elite Models",
    location: "Lagos / London",
    contact: "bookings@amara.com",
    joined: "January 2026",
    photos: [
      { caption: "London Fashion Week", date: "2026-02-18", album: "Runway" },
      { caption: "Editorial for Vogue", date: "2026-02-12", album: "Editorial" },
      { caption: "Campaign — Spring Collection", date: "2026-02-01", album: "Campaigns" },
    ],
  },
  {
    slug: "kofi",
    name: "Kofi",
    tagline: "Commercial · Fitness · Print",
    bio: "Accra-born model specialising in commercial and fitness campaigns. Featured in regional print work across West Africa.",
    stats: {
      height: '6\'1"',
      bust: '40"',
      waist: '32"',
      hips: '38"',
      shoe: "11 US",
      eyes: "Brown",
      hair: "Black",
    },
    agency: "Storm Africa",
    location: "Accra, Ghana",
    contact: "bookings@kofi.com",
    joined: "December 2025",
    photos: [
      { caption: "Fitness campaign", date: "2026-02-14", album: "Fitness" },
      { caption: "Behind the scenes — print shoot", date: "2026-02-08", album: "Print" },
      { caption: "Commercial lookbook", date: "2026-01-25", album: "Commercial" },
    ],
  },
];

async function seed() {
  console.log("🌱 Seeding Sanity with model data...\n");

  for (const modelData of models) {
    // Create the model document
    const modelDoc = await client.create({
      _type: "model",
      name: modelData.name,
      slug: { _type: "slug", current: modelData.slug },
      tagline: modelData.tagline,
      bio: modelData.bio,
      stats: modelData.stats,
      agency: modelData.agency,
      location: modelData.location,
      contact: modelData.contact,
      joined: modelData.joined,
    });

    console.log(`✅ Created model: ${modelData.name} (${modelDoc._id})`);

    // Create posts for this model
    for (const photo of modelData.photos) {
      const postDoc = await client.create({
        _type: "post",
        model: { _type: "reference", _ref: modelDoc._id },
        caption: photo.caption,
        timestamp: new Date(photo.date).toISOString(),
        album: photo.album,
        postType: "Standard",
        // Note: Images must be uploaded manually via Sanity Studio
        // since local files can't be sent as Sanity image assets via this script
      });

      console.log(`   📝 Created post: "${photo.caption}" (${postDoc._id})`);
    }

    console.log("");
  }

  console.log("🎉 Seeding complete! Remember to upload profile images and post images via Sanity Studio.");
  console.log("   Open /studio in your browser to start managing content.");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
