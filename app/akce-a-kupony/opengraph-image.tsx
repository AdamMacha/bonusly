import { ImageResponse } from "next/og";

export const alt = "Aktuální akce a ověřené slevové kódy 2026 | BONUSLY";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function AkceOpenGraphImage() {
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
          <div style={{ fontSize: 36, fontWeight: 900, display: "flex" }}>
            <span>BONUSLY</span>
            <span style={{ color: "#22C55E" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              background: "#22C55E",
              color: "#0B1220",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Ověřené kódy bez registrace
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.08 }}>
            Aktuální akce a slevové kódy 2026
          </div>
          <div style={{ fontSize: 26, color: "#94A3B8" }}>
            Jabkolevně -600 Kč · iPhoneMarket -400 Kč · Brilianty -15 % · ČSOB -20 % · Vodafone · Patria ETF
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["KÓD: sleva600", "KÓD: SLEVA400", "KÓD: BF2026"].map((code) => (
            <div
              key={code}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 14,
                border: "2px dashed rgba(74, 222, 128, 0.7)",
                background: "rgba(34, 197, 94, 0.12)",
                color: "#4ADE80",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              {code}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
