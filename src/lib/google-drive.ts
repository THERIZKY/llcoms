const DEFAULT_BASE_DRIVE_URL = "https://drive.google.com/file/d";

export const baseDriveURL =
  process.env.GOOGLE_DRIVE_BASE_URL?.trim().replace(/\/+$/, "") ||
  DEFAULT_BASE_DRIVE_URL;

export function buildDrivePreviewUrl(driveFileId: string) {
  return `${baseDriveURL}/${driveFileId}/preview`;
}
