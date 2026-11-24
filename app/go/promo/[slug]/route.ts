import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { isEhubUrl, appendSubId } from "@/lib/affiliate";

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
          active: true,
        },
      },
    },
  });

  if (!promo || !promo.active || !promo.offer.active) {
    return NextResponse.redirect(new URL("/akce-a-kupony", request.url));
  }

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

  const referrer = request.headers.get("referer") || null;
  const userAgent = request.headers.get("user-agent") || null;
  const utmSource = url.searchParams.get("utm_source");
  const utmMedium = url.searchParams.get("utm_medium");
  const utmCampaign = url.searchParams.get("utm_campaign") || `promo:${promo.trackingSlug}`;

  try {
    await prisma.click.create({
      data: {
        offerId: promo.offer.id,
        userId: userId || undefined,
        referrer,
        utmSource,
        utmMedium,
        utmCampaign,
        userAgent,
      },
    });
  } catch {
    console.error("Failed to track promo click for:", slug);
  }

  let targetUrl = promo.affiliateUrl;

  if (userId && (isEhubUrl(targetUrl, promo.offer.partnerNetwork) || promo.offer.partnerNetwork === "ehub")) {
    targetUrl = appendSubId(targetUrl, userId, "sub_id");
  }

  return NextResponse.redirect(targetUrl);
}
