const SQLITE_RELATIVE_PREFIX = "file:./";
const SQLITE_RUNTIME_PREFIX = "file:./prisma/";

export function getRuntimeDatabaseUrl(databaseUrl?: string) {
  const value = databaseUrl?.trim();

  if (!value) {
    throw new Error("DATABASE_URL belum diatur.");
  }

  if (!value.startsWith(SQLITE_RELATIVE_PREFIX)) {
    return value;
  }

  if (value.startsWith(SQLITE_RUNTIME_PREFIX)) {
    return value;
  }

  return `file:./prisma/${value.slice(SQLITE_RELATIVE_PREFIX.length)}`;
}
