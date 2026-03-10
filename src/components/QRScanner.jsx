import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const parseQRCode = (qrCodeText) => {
    // Expected format: REGION/STATION/BUILDING/FLOOR/ROOM
    // Example: HQ/HQ/OTS Building B/8/VPN Server Room
    console.log("Parsing QR Code:", qrCodeText);

    try {
      // Remove any whitespace and split by "/"
      const parts = qrCodeText.trim().split("/");
      
      if (parts.length < 2) {
        throw new Error("Invalid QR code format");
      }

      const locationParams = {
        region: parts[0] || undefined,
        station: parts[1] || undefined, // RTOM/Station
        building: parts[2] || undefined,
        floor: parts[3] || undefined,
        room: parts[4] || undefined,
      };

      console.log("Parsed location params:", locationParams);
      return locationParams;
    } catch (error) {
      console.error("Error parsing QR code:", error);
      return null;
    }
  };

  const handleScanSuccess = async (decodedText, qrCodeScanner) => {
    try {
      // Stop scanner first
      await qrCodeScanner.stop();

      // Parse QR code directly
      const locationParams = parseQRCode(decodedText);

      if (locationParams && locationParams.region && locationParams.station) {
        try {
          // Build the URL with the extracted parameters
          // Route pattern: /:region/:rtom/:station/:building/:floor?/:room?
          const region = locationParams.region || "HQ";
          const rtom = locationParams.station || "HQ"; // Using station as rtom for now
          const station = locationParams.station || "HQ";
          const building = locationParams.building || "Unknown";
          const floor = locationParams.floor || "1";
          const room = locationParams.room || "General";
          
          const url = `/${region}/${rtom}/${station}/${building}/${floor}/${room}`;
          console.log("Navigating to:", url);
          
          navigate(url);
        } catch (err) {
          console.error("Navigation error:", err);
          setErrorMessage(err.message || "Failed to navigate to location page");
          setShowError(true);
        }
      } else {
        setErrorMessage("Invalid QR code format. Expected: REGION/STATION/BUILDING/FLOOR/ROOM");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error processing QR code:", error);

      // Stop scanner on error
      await qrCodeScanner.stop().catch(() => {});

      setErrorMessage(error.message || "Failed to process QR code");
      setShowError(true);
    }
  };

  useEffect(() => {
    const qrCodeScanner = new Html5Qrcode("qr-reader");

    qrCodeScanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => handleScanSuccess(decodedText, qrCodeScanner)
      )
      .catch(console.error);

    return () => {
      qrCodeScanner.stop().catch(() => {});
    };
  }, [navigate]);

  return (
    <div>
      <h2>QR Scanner</h2>
      <div id="qr-reader" style={{ width: "300px" }} />

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.876c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">QR Code Error</h3>
            </div>
            <p className="text-gray-600 mb-6 text-base">
              {errorMessage}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowError(false);
                  setErrorMessage("");
                  navigate("/");
                }}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
              >
                Go to Home
              </button>
              <button
                onClick={() => {
                  setShowError(false);
                  setErrorMessage("");
                  window.location.reload();
                }}
                className="flex-1 px-4 py-3 bg-[#050E3C] text-white rounded-lg hover:bg-[#050E3C]/90 transition-all font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
