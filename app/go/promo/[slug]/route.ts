import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { isEhubUrl, appendEhubTracking } from "@/lib/affiliate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const promo = await prisma.offerPromo.findUnique({
    where: { trackingSlug: slug },
    include: {
      offer: {
        select: {
          id: true,
          partnerNetwork: true,
          cashbackAllowed: true,
          active: true,
        },
      },
    },
  });

  if (!promo || !promo.active || !promo.offer.active) {
    return NextResponse.redirect(new URL("/akce-a-kupony", request.url));
  }

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
  const utmCampaign = url.searchParams.get("utm_campaign") || `promo:${promo.trackingSlug}`;

  let clickId: string | null = null;
  try {
    const click = await prisma.click.create({
      data: {
        offerId: promo.offer.id,
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
    console.error("Failed to track promo click for:", slug);
  }

  let targetUrl = promo.affiliateUrl;

  if (isEhubUrl(targetUrl, promo.offer.partnerNetwork)) {
    targetUrl = appendEhubTracking(targetUrl, {
      userId: promo.offer.cashbackAllowed ? userId : null,
      clickId,
    });
  }

  return NextResponse.redirect(targetUrl);
}
