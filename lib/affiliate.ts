/**
 * Detekuje, zda URL patří do affiliate sítě eHUB.
 */
export function isEhubUrl(url: string, partnerNetwork?: string | null): boolean {
  if (partnerNetwork?.toLowerCase() === "ehub") return true;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    return (
      host === "ehub.cz" ||
      host.endsWith(".ehub.cz") ||
      host === "ehb.cz" ||
      host.endsWith(".ehb.cz") ||
      host.includes("track.ehub")
    );
  } catch {
    return false;
  }
}

/**
 * Přidá měřící parametr sub_id k affiliate odkazu.
 */
export function appendSubId(
  url: string,
  subId: string | null | undefined,
  paramName = "sub_id"
): string {
  if (!subId || !subId.trim()) return url;

  try {
    const parsed = new URL(url);
    parsed.searchParams.set("sub_id", subId.trim());
    parsed.searchParams.set("data1", subId.trim());
    return parsed.toString();
  } catch {
    // Pokud je URL relativní nebo neplatná
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}sub_id=${encodeURIComponent(subId.trim())}&data1=${encodeURIComponent(subId.trim())}`;
  }
}

/**
 * Sestaví interní přesměrovací odkaz /go/[trackingSlug] se sub_id uživatele.
 */
export function getOutboundLink(trackingSlug: string, userId?: string | null): string {
  if (userId) {
    return `/go/${trackingSlug}?sub_id=${encodeURIComponent(userId)}`;
  }
  return `/go/${trackingSlug}`;
}
