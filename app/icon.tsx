import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const fontData = readFileSync(
    join(process.cwd(), "app/fonts/modernline-bold.otf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#c8154b",
            fontFamily: "Modernline",
            fontSize: 15,
            fontWeight: 700,
            lineHeight: 1,
            transform: "translateX(4px)",
            WebkitTextStroke: "0.45px currentColor",
          }}
        >
          <span style={{ display: "block" }}>S</span>
          <span style={{ display: "block", marginLeft: "-0.42em" }}>H</span>
          <span style={{ display: "block", marginLeft: "-0.15em" }}>R.</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Modernline",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
