import type QRCodeStyling from "qr-code-styling";

export async function exportPNG(qr: QRCodeStyling, filename = "trimit-qr") {
  await qr.download({
    extension: "png",
    name: filename,
  });
}

export async function exportSVG(qr: QRCodeStyling, filename = "trimit-qr") {
  await qr.download({
    extension: "svg",
    name: filename,
  });
}
