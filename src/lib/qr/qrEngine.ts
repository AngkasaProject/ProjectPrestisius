import QRCodeStyling from "qr-code-styling";

let qrInstance: QRCodeStyling | null = null;

export function getQREngine() {
  if (!qrInstance) {
    qrInstance = new QRCodeStyling({
      width: 240,
      height: 240,
      type: "svg",
    });
  }

  return qrInstance;
}
