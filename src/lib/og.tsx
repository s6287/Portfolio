import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** One shared layout for every preview card, so shared links look like a set. */
export function ogImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f4f5fa", color: "#141a3c", padding: 72, fontFamily: "Georgia, serif" }}>
        <div style={{ display: "flex", fontSize: 32, color: "#535a82" }}>{eyebrow}</div>
        <div style={{ display: "flex", fontSize: title.length > 28 ? 84 : 112, lineHeight: 1.02, letterSpacing: -2 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 30 }}>
          <div style={{ display: "flex" }}>{footer}</div>
          <div style={{ display: "flex", width: 220, height: 22, background: "#f2a900", borderRadius: 4 }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
