import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { isEhubUrl, appendEhubTracking } from "@/lib/affiliate";

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
      cashbackAllowed: true,
      active: true,
    },
  });

  if (!offer || !offer.active) {
    return NextResponse.redirect(new URL("/nabidky", request.url));
  }

  // Identitu uživatele bereme bezpečně výhradně ze session (nelze podvrhnout přes URL query)
  let userId: string | null = null;
  try {
    const session = await auth();
    userId = session?.user?.id || null;
  } catch {
    userId = null;
  }

  const url = new URL(request.url);
  const referrer = request.headers.get("referer") || null;
  const userAgent = request.headers.get("user-agent") || null;
  const utmSource = url.searchParams.get("utm_source");
  const utmMedium = url.searchParams.get("utm_medium");
  const utmCampaign = url.searchParams.get("utm_campaign");

  let clickId: string | null = null;
  try {
    const click = await prisma.click.create({
      data: {
        offerId: offer.id,
        userId: userId || undefined,
        referrer,
        utmSource,
        utmMedium,
        utmCampaign,
        userAgent,
      },
      select: { id: true },
    });
    clickId = click.id;
  } catch {
    console.error("Failed to track click for:", slug);
  }

  let targetUrl = offer.affiliateUrl || offer.referralUrl;

  // Pro eHUB odkazy přidáme data2=clickId (analytika + reklamace) a data1=userId
  // výhradně pokud je uživatel přihlášen A nabídka povoluje cashback!
  if (isEhubUrl(targetUrl, offer.partnerNetwork)) {
    targetUrl = appendEhubTracking(targetUrl, {
      userId: offer.cashbackAllowed ? userId : null,
      clickId,
    });
  }

  return NextResponse.redirect(targetUrl);
}
