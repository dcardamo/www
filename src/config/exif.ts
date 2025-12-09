export const exifConfig = {
  defaultDisplay: true,
  defaultFields: ['model', 'lens', 'focalLength', 'fNumber', 'exposureTime', 'iso'] as const,
  availableFields: {
    make: 'Make',
    model: 'Camera',
    lens: 'Lens',
    focalLength: 'Focal Length',
    fNumber: 'Aperture',
    exposureTime: 'Shutter Speed',
    iso: 'ISO',
    dateTime: 'Date Taken',
  } as const,
};

export type ExifFieldKey = keyof typeof exifConfig.availableFields;
