import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 32, height: 32 };
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
        <span
          style={{
            fontFamily: "Modernline",
            fontSize: 14,
            fontWeight: 700,
            color: "#c8154b",
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          SHR.
        </span>
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
