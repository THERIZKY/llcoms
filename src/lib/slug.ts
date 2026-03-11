const customCharacterMap: Record<string, string> = {
  μ: "mu",
  µ: "mu",
};

export function slugify(value: string) {
  const normalized = value
    .trim()
    .split("")
    .map((character) => customCharacterMap[character] ?? character)
    .join("")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || "untitled";
}

export function appendSlugSuffix(baseSlug: string, suffix: number) {
  return `${baseSlug}-${suffix}`;
}
