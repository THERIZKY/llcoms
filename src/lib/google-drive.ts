const DEFAULT_BASE_DRIVE_URL = "https://drive.google.com/file/d";

export const baseDriveURL =
  process.env.GOOGLE_DRIVE_BASE_URL?.trim().replace(/\/+$/, "") ||
  DEFAULT_BASE_DRIVE_URL;

export function buildDrivePreviewUrl(driveFileId: string) {
  return `${baseDriveURL}/${driveFileId}/preview`;
}

export function extractDriveFileId(input: string) {
  const trimmed = input.trim();

  if (!trimmed) {
    return "";
  }

  const directMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);

  if (directMatch) {
    return directMatch[1];
  }

  const queryMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  if (queryMatch) {
    return queryMatch[1];
  }

  return trimmed;
}
