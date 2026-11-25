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
 * Připojí oficiální eHUB SubID parametry data1 (uživatel) a data2 (clickId)
 * k partnerskému odkazu bez narušení a_aid, a_bid nebo desturl.
 */
export function appendEhubTracking(
  url: string,
  params: { userId?: string | null; clickId?: string | null }
): string {
  const data1 = params.userId?.trim();
  const data2 = params.clickId?.trim();
  if (!data1 && !data2) return url;

  try {
    const parsed = new URL(url);
    if (data1) parsed.searchParams.set("data1", data1);
    if (data2) parsed.searchParams.set("data2", data2);
    return parsed.toString();
  } catch {
    const parts: string[] = [];
    if (data1) parts.push(`data1=${encodeURIComponent(data1)}`);
    if (data2) parts.push(`data2=${encodeURIComponent(data2)}`);
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${parts.join("&")}`;
  }
}

/**
 * Zpětně kompatibilní helper pro přidání identifikátoru uživatele k eHUB odkazu.
 */
export function appendSubId(
  url: string,
  subId: string | null | undefined,
  clickId?: string | null
): string {
  return appendEhubTracking(url, { userId: subId, clickId });
}

/**
 * Sestaví interní přesměrovací odkaz /go/[trackingSlug].
 */
export function getOutboundLink(trackingSlug: string): string {
  return `/go/${trackingSlug}`;
}
