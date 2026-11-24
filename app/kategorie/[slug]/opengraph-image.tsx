import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";

export const alt = "Kategorie nabídek na BONUSLY";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function CategoryOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      _count: { select: { offers: { where: { active: true } } } },
    },
  });

  const name = category?.name || "Kategorie nabídek";
  const desc = category?.description || "Přehled ověřených nabídek, bonusů a slev na BONUSLY.";
  const count = category?._count.offers ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0B1220 0%, #111A2E 65%, #0F2922 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.03em", display: "flex" }}>
            <span>BONUSLY</span>
            <span style={{ color: "#22C55E" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(34, 197, 94, 0.16)",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              color: "#4ADE80",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {count} ověřených nabídek
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            {name}
          </div>
          <div style={{ fontSize: 28, color: "#94A3B8", lineHeight: 1.4, maxWidth: 960 }}>
            {desc}
          </div>
        </div>

        <div style={{ fontSize: 22, color: "#4ADE80", fontWeight: 700, display: "flex" }}>
          Srovnání, recenze, podmínky a aktuální promo akce → bonusly.cz
        </div>
      </div>
    ),
    { ...size }
  );
}
