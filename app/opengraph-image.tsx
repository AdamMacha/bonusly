import { ImageResponse } from "next/og";

export const alt = "BONUSLY — Ověřené bonusy, slevové kódy, investice a extra příjem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: "-0.03em",
            }}
          >
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
            Ověřené nabídky ČR
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 960 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Bonusy, slevové kódy</span>
            <span style={{ color: "#22C55E" }}>a výhody, které se vyplatí.</span>
          </div>
          <div style={{ fontSize: 28, color: "#94A3B8", lineHeight: 1.4 }}>
            Banky, investice, pojištění, energie, ověřené promo kódy a extra příjem na jednom místě.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["40+ ověřených nabídek", "Aktuální slevové kódy", "Detailní srovnání"].map((pill) => (
            <div
              key={pill}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: 20,
                color: "#E2E8F0",
                fontWeight: 600,
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
