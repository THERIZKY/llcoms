-- Redefine group metadata fields
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Group" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "thumbnail" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "accentColor" TEXT,
  "sortOrder" INTEGER NOT NULL,
  "videoSectionOrder" INTEGER NOT NULL
);

INSERT INTO "new_Group" (
  "id",
  "name",
  "slug",
  "description",
  "thumbnail",
  "createdAt",
  "accentColor",
  "sortOrder",
  "videoSectionOrder"
)
SELECT
  "id",
  "name",
  "slug",
  "summary",
  "thumbnail",
  CURRENT_TIMESTAMP,
  "accentColor",
  "sortOrder",
  "videoSectionOrder"
FROM "Group";

DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";

CREATE UNIQUE INDEX "Group_slug_key" ON "Group"("slug");
CREATE INDEX "Group_sortOrder_idx" ON "Group"("sortOrder");
CREATE INDEX "Group_videoSectionOrder_idx" ON "Group"("videoSectionOrder");

-- Redefine concert metadata fields
CREATE TABLE "new_Concert" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "groupId" TEXT,
  "year" INTEGER NOT NULL,
  "description" TEXT NOT NULL,
  "thumbnail" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Concert_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO "new_Concert" (
  "id",
  "title",
  "slug",
  "groupId",
  "year",
  "description",
  "thumbnail",
  "createdAt"
)
SELECT
  "id",
  "title",
  "slug",
  "groupId",
  "eventYear",
  "description",
  "thumbnail",
  "createdAt"
FROM "Concert";

DROP TABLE "Concert";
ALTER TABLE "new_Concert" RENAME TO "Concert";

CREATE UNIQUE INDEX "Concert_slug_key" ON "Concert"("slug");
CREATE INDEX "Concert_groupId_idx" ON "Concert"("groupId");
CREATE INDEX "Concert_createdAt_idx" ON "Concert"("createdAt");
CREATE INDEX "Concert_year_idx" ON "Concert"("year");

-- Replace the old video table with concert discs while preserving playback sources
CREATE TABLE "ConcertDisc" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "concertId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "streamUrl" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ConcertDisc_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "ConcertDisc" (
  "id",
  "concertId",
  "title",
  "type",
  "streamUrl",
  "sortOrder",
  "createdAt"
)
SELECT
  "id",
  "concertId",
  "title",
  CASE
    WHEN lower("title") LIKE '%bonus%' THEN 'Bonus'
    ELSE 'BD'
  END,
  'https://drive.google.com/file/d/' || "driveFileId" || '/preview',
  "playlistOrder",
  "uploadedAt"
FROM "Video";

DROP TABLE "Video";

CREATE INDEX "ConcertDisc_concertId_idx" ON "ConcertDisc"("concertId");
CREATE INDEX "ConcertDisc_createdAt_idx" ON "ConcertDisc"("createdAt");
CREATE INDEX "ConcertDisc_type_idx" ON "ConcertDisc"("type");
CREATE UNIQUE INDEX "ConcertDisc_concertId_sortOrder_key" ON "ConcertDisc"("concertId", "sortOrder");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
