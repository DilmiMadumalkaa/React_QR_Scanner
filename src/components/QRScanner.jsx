import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import api from "../services/apiService";

const QRScanner = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const handleScanSuccess = async (decodedText, qrCodeScanner) => {
    try {
      // Stop scanner first
      await qrCodeScanner.stop();

      // Validate QR code with backend
      const response = await api.post("/locations/validate-qr", {
        qrCode: decodedText,
      });

      // If QR code is registered, navigate to location page
      if (response.data.isValid && response.data.location) {
        navigate('/location', {
          state: {
            locationId: response.data.location.id,
            locationData: response.data.location,
          },
        });
      } else {
        // QR code not registered
        setErrorMessage("QR code is not registered in the system");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error validating QR code:", error);
      
      // Stop scanner on error
      await qrCodeScanner.stop().catch(() => {});
      
      setErrorMessage(
        error.response?.data?.message || 
        "This QR code is not registered in the system"
      );
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">QR Code Not Found</h3>
            </div>
            <p className="text-gray-600 mb-6 text-base">
              {errorMessage}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowError(false);
                  setErrorMessage("");
                  navigate('/');
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
                Scan Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
