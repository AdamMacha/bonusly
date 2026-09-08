import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const offer = await prisma.offer.findUnique({
    where: { trackingSlug: slug },
    select: { id: true, referralUrl: true, active: true },
  });

  if (!offer || !offer.active) {
    return NextResponse.redirect(new URL("/nabidky", request.url));
  }

  // Track the click
  const referrer = request.headers.get("referer") || null;
  const userAgent = request.headers.get("user-agent") || null;
  const url = new URL(request.url);
  const utmSource = url.searchParams.get("utm_source");
  const utmMedium = url.searchParams.get("utm_medium");
  const utmCampaign = url.searchParams.get("utm_campaign");

  try {
    await prisma.click.create({
      data: {
        offerId: offer.id,
        referrer,
        utmSource,
        utmMedium,
        utmCampaign,
        userAgent,
      },
    });
  } catch {
    // Don't block redirect if tracking fails
    console.error("Failed to track click for:", slug);
  }

  return NextResponse.redirect(offer.referralUrl);
}
