export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function stripUnsafeText(input: string): string {
  return input.replace(/[\u0000-\u001F\u007F]/g, "").trim();
}