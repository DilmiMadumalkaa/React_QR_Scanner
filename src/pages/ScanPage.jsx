import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./ScanPage.css";
import { useZxing } from "react-zxing";
import { sendScanResult } from "../services/apiService";

export default function ScanPage() {
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(null);
  const [error, setError] = useState(null);

  const onResult = useCallback(async (result) => {
    if (!result) return;
    const text = result.getText();
    setScanned(text);

    try {
      await sendScanResult({ qr: text });
    } catch (err) {
      console.error(err);
      setError("Failed to send scan to server");
    }
  }, []);

  const { ref, start } = useZxing({
    onDecodeResult: onResult,
    constraints: { facingMode: "environment" },
  });

  return (
    <div className="scan-container creative-bg">
      <div className="scan-header fade-in">
        <h2 className="scan-title">🔍 Scan QR Code</h2>

        <div className="btn-group">
          <button onClick={() => navigate("/")} className="btn back-btn">
            ← Back
          </button>

          <button onClick={() => start()} className="btn start-btn">
            📷 Start Camera
          </button>
        </div>
      </div>

      {/* Video Scanner */}
      <div className="scanner-card fade-in-delayed">
        <div className="scanner-frame-glow">
          <video ref={ref} className="scanner-video" />
        </div>
      </div>

      {/* Scanned result */}
      {scanned && (
        <div className="result-card fade-in-delayed">
          <h3>✅ Scanned Result</h3>
          <p className="result-text">{scanned}</p>
        </div>
      )}

      {error && <div className="error-text fade-in">{error}</div>}
    </div>
  );
}
