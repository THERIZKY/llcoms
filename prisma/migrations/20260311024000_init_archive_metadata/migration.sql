-- CreateTable
CREATE TABLE IF NOT EXISTS "Group" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "thumbnail" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "accentColor" TEXT,
  "sortOrder" INTEGER NOT NULL,
  "videoSectionOrder" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Concert" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "groupId" TEXT,
  "thumbnail" TEXT NOT NULL,
  "eventYear" INTEGER NOT NULL,
  "createdAt" DATETIME NOT NULL,
  "description" TEXT NOT NULL,
  "isCrossGeneration" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "Concert_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Video" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "concertId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "driveFileId" TEXT NOT NULL,
  "playlistOrder" INTEGER NOT NULL,
  "uploadedAt" DATETIME NOT NULL,
  CONSTRAINT "Video_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Marker" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "videoId" TEXT NOT NULL,
  "timestamp" INTEGER NOT NULL,
  "label" TEXT NOT NULL,
  CONSTRAINT "Marker_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Group_slug_key" ON "Group"("slug");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Group_sortOrder_idx" ON "Group"("sortOrder");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Group_videoSectionOrder_idx" ON "Group"("videoSectionOrder");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Concert_slug_key" ON "Concert"("slug");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Concert_groupId_idx" ON "Concert"("groupId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Concert_createdAt_idx" ON "Concert"("createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Concert_eventYear_idx" ON "Concert"("eventYear");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Concert_isCrossGeneration_idx" ON "Concert"("isCrossGeneration");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Video_concertId_idx" ON "Video"("concertId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Video_uploadedAt_idx" ON "Video"("uploadedAt");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Video_concertId_playlistOrder_key" ON "Video"("concertId", "playlistOrder");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Marker_videoId_timestamp_idx" ON "Marker"("videoId", "timestamp");
