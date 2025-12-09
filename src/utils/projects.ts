import type { ImageMetadata } from "astro";
import { extractExif, type PhotoExif } from "./exif";

export interface ProjectImage {
  path: string;
  image: ImageMetadata;
  filename: string;
  exif?: PhotoExif | null;
}

/**
 * Convert virtual path to filesystem path
 * /src/content/www/Street/IMG_001.jpg -> ./src/content/www/Street/IMG_001.jpg
 */
function virtualToFsPath(virtualPath: string): string {
  return virtualPath.replace(/^\/src\//, "./src/");
}

/**
 * Humanize a project slug into a title
 * "iceland-2024" -> "Iceland 2024"
 * "street" -> "Street"
 */
export function humanizeProjectName(slug: string): string {
  return slug
    .split("/")
    .map((part) =>
      part
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    )
    .join(" / ");
}

/**
 * Find the cover image for a project
 * 1. Use manual coverImage if specified
 * 2. Use highest rated image (by EXIF Rating)
 * 3. If tie or no ratings, use first alphabetically
 */
export async function findCoverImage(
  images: ProjectImage[],
  manualCoverFilename?: string,
): Promise<ProjectImage | undefined> {
  if (images.length === 0) return undefined;

  // 1. Manual override
  if (manualCoverFilename) {
    const manual = images.find((img) => img.filename === manualCoverFilename);
    if (manual) return manual;
  }

  // 2. Ensure all images have EXIF extracted
  const imagesWithExif = await Promise.all(
    images.map(async (img) => {
      if (!img.exif) {
        const fsPath = virtualToFsPath(img.path);
        img.exif = await extractExif(fsPath);
      }
      return img;
    }),
  );

  // 3. Find highest rating
  const ratings = imagesWithExif.map((img) => img.exif?.rating || 0);
  const maxRating = Math.max(...ratings);

  // 4. Get all images with max rating
  const topRated = imagesWithExif.filter(
    (img) => (img.exif?.rating || 0) === maxRating,
  );

  // 5. Sort alphabetically and return first
  const sorted = topRated.sort((a, b) => a.filename.localeCompare(b.filename));
  return sorted[0];
}

/**
 * Get the newest photo date from a set of images
 * Used for auto-generating project date
 */
export async function getNewestPhotoDate(
  images: ProjectImage[],
): Promise<Date> {
  const dates: Date[] = [];

  for (const img of images) {
    if (!img.exif) {
      const fsPath = virtualToFsPath(img.path);
      img.exif = await extractExif(fsPath);
    }
    if (img.exif?.dateTime) {
      dates.push(img.exif.dateTime);
    }
  }

  if (dates.length === 0) {
    return new Date(); // Default to now if no EXIF dates found
  }

  // Return the newest date
  return new Date(Math.max(...dates.map((d) => d.getTime())));
}
