import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

export interface QRCanvasRef {
  download: (filename: string) => Promise<void>;
}

interface Props {
  value: string;

  foreground: string;
  background: string;

  logo?: string;

  size?: number;

  margin?: number;
}

const QRCanvas = forwardRef<QRCanvasRef, Props>(
  (
    {
      value,
      foreground,
      background,
      logo = "/brand/logo-kotak.png",
      size = 305,
      margin = 8,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const qrRef = useRef<QRCodeStyling | null>(null);

    useImperativeHandle(ref, () => ({
      async download(filename: string) {
        if (!qrRef.current) return;

        await qrRef.current.download({
          name: filename,
          extension: "png",
        });
      },
    }));

    useEffect(() => {
      if (!containerRef.current) return;

      if (!qrRef.current) {
        qrRef.current = new QRCodeStyling({
          type: "svg",

          width: size,
          height: size,

          data: value || " ",

          margin,

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

        qrRef.current.append(containerRef.current);
      }
    }, []);

    useEffect(() => {
      qrRef.current?.update({
        width: size,
        height: size,

        data: value || " ",

        margin,

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
    }, [value, foreground, background, logo, size, margin]);

    return (
      <div
        ref={containerRef}
        style={{
          width: size,
          height: size,
        }}
      />
    );
  },
);

QRCanvas.displayName = "QRCanvas";

export default QRCanvas;
