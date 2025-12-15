import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = () => {
  useEffect(() => {
    const qrCodeScanner = new Html5Qrcode("qr-reader");

    qrCodeScanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          alert(`Scanned: ${decodedText}`);
        }
      )
      .catch(console.error);

    return () => {
      qrCodeScanner.stop().catch(() => {});
    };
  }, []);

  return (
    <div>
      <h2>QR Scanner</h2>
      <div id="qr-reader" style={{ width: "300px" }} />
    </div>
  );
};

export default QRScanner;
