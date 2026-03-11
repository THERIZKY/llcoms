PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_ConcertDisc" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "concertId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "driveId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ConcertDisc_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "new_ConcertDisc" (
  "id",
  "concertId",
  "title",
  "slug",
  "description",
  "driveId",
  "type",
  "sortOrder",
  "createdAt"
)
SELECT
  "id",
  "concertId",
  "title",
  lower(
    replace(
      replace(
        replace(
          replace(
            replace("title", " ", "-"),
            "!",
            ""
          ),
          "'",
          ""
        ),
        "(",
        ""
      ),
      ")",
      ""
    )
  ),
  'Archive video for ' || "title" || '.',
  replace(replace("streamUrl", 'https://drive.google.com/file/d/', ''), '/preview', ''),
  "type",
  "sortOrder",
  "createdAt"
FROM "ConcertDisc";

DROP TABLE "ConcertDisc";
ALTER TABLE "new_ConcertDisc" RENAME TO "ConcertDisc";

CREATE INDEX "ConcertDisc_concertId_idx" ON "ConcertDisc"("concertId");
CREATE INDEX "ConcertDisc_createdAt_idx" ON "ConcertDisc"("createdAt");
CREATE INDEX "ConcertDisc_type_idx" ON "ConcertDisc"("type");
CREATE UNIQUE INDEX "ConcertDisc_concertId_slug_key" ON "ConcertDisc"("concertId", "slug");
CREATE UNIQUE INDEX "ConcertDisc_concertId_sortOrder_key" ON "ConcertDisc"("concertId", "sortOrder");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
