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
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "Modernline",
              fontSize: 22,
              fontWeight: 700,
              color: "#c8154b",
              lineHeight: 1,
            }}
          >
            S
          </span>
          <span
            style={{
              fontFamily: "Modernline",
              fontSize: 22,
              fontWeight: 700,
              color: "#c8154b",
              marginLeft: "-0.42em",
              lineHeight: 1,
            }}
          >
            H
          </span>
          <span
            style={{
              fontFamily: "Modernline",
              fontSize: 22,
              fontWeight: 700,
              color: "#c8154b",
              marginLeft: "-0.15em",
              lineHeight: 1,
            }}
          >
            R.
          </span>
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
