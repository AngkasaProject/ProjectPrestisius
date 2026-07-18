import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface Props {
  value: string;

  foreground: string;
  background: string;

  logo?: string;
}

export default function QRCanvas({
  value,
  foreground,
  background,
  logo = "/brand/logo-kotak.png",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling({
        width: 305,
        height: 305,

        data: value || " ",

        margin: 8,

        image: logo,

        dotsOptions: {
          color: foreground,
          type: "rounded",
        },

        cornersSquareOptions: {
          color: foreground,
          type: "extra-rounded",
        },

        cornersDotOptions: {
          color: foreground,
          type: "dot",
        },

        backgroundOptions: {
          color: background,
        },

        imageOptions: {
          crossOrigin: "anonymous",
          margin: 6,
          imageSize: 0.28,
        },
      });

      if (containerRef.current) {
        qrRef.current.append(containerRef.current);
      }
    }
  }, []);

  useEffect(() => {
    qrRef.current?.update({
      width: 305,
      height: 305,

      data: value || " ",

      margin: 8,

      image: logo,

      dotsOptions: {
        color: foreground,
        type: "rounded",
      },

      cornersSquareOptions: {
        color: foreground,
        type: "extra-rounded",
      },

      cornersDotOptions: {
        color: foreground,
        type: "dot",
      },

      backgroundOptions: {
        color: background,
      },
    });
  }, [value, foreground, background, logo]);

  return (
    <div
      ref={containerRef}
      style={{
        width: 320,
        height: 320,
      }}
    />
  );
}
