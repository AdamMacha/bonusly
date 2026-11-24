import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";

export const alt = "Detail nabídky na BONUSLY";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OfferOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const offer = await prisma.offer.findUnique({
    where: { slug },
    select: {
      name: true,
      shortDescription: true,
      bonus: true,
      promoCode: true,
      rating: true,
      category: { select: { name: true } },
    },
  });

  const title = offer?.name || "Ověřená nabídka";
  const subtitle = offer?.shortDescription || "Podrobné podmínky, výhody a návod krok za krokem.";
  const bonus = offer?.bonus || "Ověřená partnerská nabídka";
  const categoryName = offer?.category?.name || "BONUSLY";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 68px",
          background: "linear-gradient(135deg, #0B1220 0%, #111A2E 60%, #0D261F 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.03em", display: "flex" }}>
              <span>BONUSLY</span>
              <span style={{ color: "#22C55E" }}>.</span>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#CBD5E1",
                fontSize: 19,
                fontWeight: 600,
              }}
            >
              {categoryName}
            </div>
          </div>

          {offer?.rating && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                borderRadius: 12,
                background: "rgba(251, 191, 36, 0.14)",
                border: "1px solid rgba(251, 191, 36, 0.35)",
                color: "#FCD34D",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              <span>★ {offer.rating.toFixed(1)} / 5</span>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#94A3B8",
              lineHeight: 1.4,
              maxWidth: 980,
            }}
          >
            {subtitle.length > 130 ? `${subtitle.slice(0, 127)}...` : subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "18px 28px",
              borderRadius: 18,
              background: "#22C55E",
              color: "#0B1220",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {bonus.length > 52 ? `${bonus.slice(0, 49)}...` : bonus}
          </div>

          {offer?.promoCode && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 26px",
                borderRadius: 18,
                background: "rgba(255,255,255,0.08)",
                border: "2px dashed rgba(74, 222, 128, 0.6)",
                color: "#4ADE80",
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              <span>KÓD: {offer.promoCode}</span>
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
