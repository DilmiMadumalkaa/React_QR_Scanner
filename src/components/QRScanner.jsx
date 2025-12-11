import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

const QRScanner = () => {
  const [data, setData] = useState(null);

  const handleScan = (result) => {
    if (result) setData(result.text || result);
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <h2>QR Scanner</h2>

      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "300px" }}
      />

      {data && <p>Scanned: {data}</p>}
    </div>
  );
};

export default QRScanner;