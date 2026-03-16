export function parseTagList(value: string) {
  const unique = new Map<string, string>();

  value
    .split(",")
    .map((item) => item.trim().replace(/\s+/g, " "))
    .filter(Boolean)
    .forEach((item) => {
      const key = item.toLowerCase();

      if (!unique.has(key)) {
        unique.set(key, item);
      }
    });

  return Array.from(unique.values());
}
