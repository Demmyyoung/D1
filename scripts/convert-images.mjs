import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import { join, extname, basename } from "path";

const INPUT_DIR = "./img";
const OUTPUT_DIR = "./public/photos";

async function convert() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = await readdir(INPUT_DIR);
  let count = 0;
  let skipped = 0;

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const name = basename(file, extname(file));
    const inputPath = join(INPUT_DIR, file);
    const outputPath = join(OUTPUT_DIR, `${name}.jpg`);

    if (ext === ".heic") {
      console.log(`Skipping HEIC (not supported on Windows): ${file}`);
      skipped++;
      continue;
    }

    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      console.log(`Optimizing: ${file} → ${name}.jpg`);
      await sharp(inputPath).jpeg({ quality: 85 }).toFile(outputPath);
      count++;
    }
  }

  console.log(
    `\nDone! Processed ${count} images, skipped ${skipped} HEIC files.`,
  );
  console.log(`Output: ${OUTPUT_DIR}`);
}

convert().catch(console.error);
