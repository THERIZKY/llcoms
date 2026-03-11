const DEFAULT_REDIRECT = "/";

export function sanitizeRedirectTo(
  value: FormDataEntryValue | string | null | undefined,
  fallback = DEFAULT_REDIRECT,
) {
  if (typeof value !== "string") {
    return fallback;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

export function buildLoginHref(redirectTo: string, reason?: string) {
  const searchParams = new URLSearchParams({
    redirectTo,
  });

  if (reason) {
    searchParams.set("reason", reason);
  }

  return `/login?${searchParams.toString()}`;
}
