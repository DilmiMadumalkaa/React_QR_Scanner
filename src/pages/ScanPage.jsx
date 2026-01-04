import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import api from "../services/apiService";

export default function ScanPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const scannerRef = useRef(null);
  const qrCodeScannerRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (qrCodeScannerRef.current && qrCodeScannerRef.current.isScanning) {
        qrCodeScannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const handleStartCamera = async () => {
    try {
      setError(null);

      if (!qrCodeScannerRef.current) {
        qrCodeScannerRef.current = new Html5Qrcode("qr-reader");
      }

      const config = {
        fps: 20, // Increased fps for better scanning
        qrbox: 250, // Simpler qrbox configuration
        aspectRatio: 1.0,
        disableFlip: false,
      };

      await qrCodeScannerRef.current.start(
        { facingMode: "environment" },
        config,
        async (decodedText, decodedResult) => {
          console.log(`QR Code detected: ${decodedText}`);

          // Stop camera immediately after detection
          if (qrCodeScannerRef.current && qrCodeScannerRef.current.isScanning) {
            await qrCodeScannerRef.current.stop();
            setIsCameraActive(false);
          }

          // Validate QR code with backend
          try {
            const response = await api.post("/locations/validate-qr", {
              qrCode: decodedText,
            });

            // If QR code is registered, navigate to location page
            if (response.data.isValid && response.data.location) {
              navigate("/location", {
                state: {
                  locationId: response.data.location.id,
                  locationData: response.data.location,
                },
              });
            } else {
              // QR code not registered
              setErrorMessage("QR code is not registered in the system");
              setShowErrorModal(true);
            }
          } catch (err) {
            console.error("Failed to validate QR code:", err);
            setErrorMessage(
              err.response?.data?.message ||
                "This QR code is not registered in the system"
            );
            setShowErrorModal(true);
          }
        },
        (errorMessage) => {
          // Errors during scanning - this is normal when no QR code is in view
        }
      );

      setIsCameraActive(true);
      console.log("Camera started successfully");
    } catch (err) {
      console.error("Camera start error:", err);
      setError("Failed to start camera. Please check camera permissions.");
    }
  };

  const handleStopCamera = async () => {
    try {
      if (qrCodeScannerRef.current && qrCodeScannerRef.current.isScanning) {
        await qrCodeScannerRef.current.stop();
        setIsCameraActive(false);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to stop camera");
    }
  };

  return (
    <>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Scan QR Code</h1>
        <p className="text-gray-600 mt-2">
          Position your QR code within the camera frame
        </p>
      </header>

      {/* Sidebar */}
      {/* <Sidebar 
        user={user} 
        logout={logout} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      /> */}

      <div className="flex justify-center mb-6">
        {!isCameraActive ? (
          <button
            onClick={handleStartCamera}
            className="flex items-center gap-2 bg-[#050E3C] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#050E3C]/90 transition-all shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            Start Camera
          </button>
        ) : (
          <button
            onClick={handleStopCamera}
            className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-all shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                clipRule="evenodd"
              />
            </svg>
            Stop Camera
          </button>
        )}
      </div>

      {/* Body Section */}
      <div className="flex flex-col items-center justify-center">
        {/* Video Scanner */}
        <div className="w-full max-w-md">
          <div className="bg-gray-100 rounded-2xl p-4 mt-3 shadow-lg border-2 border-[#050E3C]/10">
            <div
              id="qr-reader"
              ref={scannerRef}
              className="max-w-[300px] mx-auto rounded-lg overflow-hidden"
            />
            {!isCameraActive && (
              <div className="flex flex-col items-center justify-center min-h-[250px] bg-gray-200 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-[#050E3C] mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                <p className="text-[#050E3C] font-medium text-lg">
                  Click Start Camera to begin scanning
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 p-4 bg-red-50 border-2 border-red-500 rounded-xl max-w-2xl w-full">
            <p className="text-red-700 text-center font-medium">{error}</p>
          </div>
        )}
      </div>

      {/* Error Modal for Invalid QR Code */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                QR Code Not Found
              </h3>
            </div>
            <p className="text-gray-600 mb-6 text-base">{errorMessage}</p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  setErrorMessage("");
                  navigate("/");
                }}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
              >
                Go to Home
              </button>
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  setErrorMessage("");
                  handleStartCamera();
                }}
                className="flex-1 px-4 py-3 bg-[#050E3C] text-white rounded-lg hover:bg-[#050E3C]/90 transition-all font-medium"
              >
                Scan Again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
