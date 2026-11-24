import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { isEhubUrl, appendSubId } from "@/lib/affiliate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const offer = await prisma.offer.findUnique({
    where: { trackingSlug: slug },
    select: {
      id: true,
      referralUrl: true,
      affiliateUrl: true,
      partnerNetwork: true,
      active: true,
    },
  });

  if (!offer || !offer.active) {
    return NextResponse.redirect(new URL("/nabidky", request.url));
  }

  // Zjistíme uživatele z query parametru nebo aktuální session
  const url = new URL(request.url);
  const subIdParam = url.searchParams.get("sub_id");
  let userId = subIdParam;

  if (!userId) {
    try {
      const session = await auth();
      userId = session?.user?.id || null;
    } catch {
      userId = null;
    }
  }

  // Sledování kliku
  const referrer = request.headers.get("referer") || null;
  const userAgent = request.headers.get("user-agent") || null;
  const utmSource = url.searchParams.get("utm_source");
  const utmMedium = url.searchParams.get("utm_medium");
  const utmCampaign = url.searchParams.get("utm_campaign");

  try {
    await prisma.click.create({
      data: {
        offerId: offer.id,
        userId: userId || undefined,
        referrer,
        utmSource,
        utmMedium,
        utmCampaign,
        userAgent,
      },
    });
  } catch {
    console.error("Failed to track click for:", slug);
  }

  // Příprava cílové URL (přednost má affiliateUrl)
  let targetUrl = offer.affiliateUrl || offer.referralUrl;

  // Pokud je uživatel přihlášen a jedná se o eHUB link (nebo eHUB síť), přidáme sub_id
  if (userId && (isEhubUrl(targetUrl, offer.partnerNetwork) || offer.partnerNetwork === "ehub")) {
    targetUrl = appendSubId(targetUrl, userId, "sub_id");
  }

  return NextResponse.redirect(targetUrl);
}
