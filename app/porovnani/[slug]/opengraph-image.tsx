import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";

export const alt = "Srovnání nabídek na BONUSLY";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ComparisonOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  const [slugA, slugB] = parts.length === 2 ? parts : ["", ""];

  const [offerA, offerB] =
    slugA && slugB
      ? await Promise.all([
          prisma.offer.findUnique({
            where: { slug: slugA },
            select: { name: true, bonus: true, rating: true },
          }),
          prisma.offer.findUnique({
            where: { slug: slugB },
            select: { name: true, bonus: true, rating: true },
          }),
        ])
      : [null, null];

  const nameA = offerA?.name || "Nabídka A";
  const nameB = offerB?.name || "Nabídka B";

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
          <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.03em", display: "flex" }}>
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
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Velké srovnání 2026
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28 }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: "30px 32px",
              borderRadius: 24,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15 }}>{nameA}</div>
            {offerA?.bonus && (
              <div style={{ fontSize: 21, color: "#4ADE80", fontWeight: 700 }}>
                {offerA.bonus.length > 44 ? `${offerA.bonus.slice(0, 41)}...` : offerA.bonus}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 78,
              height: 78,
              borderRadius: 999,
              background: "#22C55E",
              color: "#0B1220",
              fontSize: 30,
              fontWeight: 900,
            }}
          >
            VS
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: "30px 32px",
              borderRadius: 24,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15 }}>{nameB}</div>
            {offerB?.bonus && (
              <div style={{ fontSize: 21, color: "#4ADE80", fontWeight: 700 }}>
                {offerB.bonus.length > 44 ? `${offerB.bonus.slice(0, 41)}...` : offerB.bonus}
              </div>
            )}
          </div>
        </div>

        <div style={{ fontSize: 22, color: "#94A3B8", display: "flex" }}>
          Objektivní porovnání bonusů, poplatků, výhod a podmínek na bonusly.cz
        </div>
      </div>
    ),
    { ...size }
  );
}
