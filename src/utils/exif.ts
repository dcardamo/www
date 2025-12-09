import exifr from "exifr";

export interface PhotoExif {
  make?: string;
  model?: string;
  exposureTime?: string;
  fNumber?: number;
  iso?: number;
  focalLength?: number;
  lens?: string;
  dateTime?: Date;
  rating?: number;
}

export async function extractExif(
  imagePath: string,
): Promise<PhotoExif | null> {
  try {
    const exif = await exifr.parse(imagePath, {
      pick: [
        "Make",
        "Model",
        "ExposureTime",
        "FNumber",
        "ISO",
        "FocalLength",
        "LensModel",
        "DateTimeOriginal",
        "Rating",
      ],
    });

    if (!exif) return null;

    return {
      make: exif?.Make,
      model: exif?.Model,
      exposureTime: formatExposureTime(exif?.ExposureTime),
      fNumber: exif?.FNumber,
      iso: exif?.ISO,
      focalLength: exif?.FocalLength,
      lens: exif?.LensModel,
      dateTime: exif?.DateTimeOriginal,
      rating: exif?.Rating,
    };
  } catch (error) {
    console.warn(`Failed to extract EXIF from ${imagePath}:`, error);
    return null;
  }
}

function formatExposureTime(value?: number): string | undefined {
  if (!value) return undefined;
  if (value >= 1) return `${value}s`;
  return `1/${Math.round(1 / value)}s`;
}
