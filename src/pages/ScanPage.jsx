import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import { sendScanResult } from "../services/apiService";

export default function ScanPage() {
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(null);
  const [error, setError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
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
      setScanned(null);
      
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
          setScanned(decodedText);
          
          try {
            await sendScanResult({ qr: decodedText });
            console.log("Scan result sent to server");
          } catch (err) {
            console.error("Failed to send to server:", err);
            setError("Failed to send scan to server");
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
    <div className="min-h-screen p-[30px] bg-gradient-to-br from-slate-900 to-slate-800 text-white animate-[gradientMove_12s_ease_infinite] bg-[length:200%_200%]">
      <div className="flex justify-between items-center mb-[25px] opacity-0 animate-[fade_1s_forwards]">
        <h2 className="text-[28px] font-bold">🔍 Scan QR Code</h2>

        <div className="flex gap-[10px]">
          <button 
            onClick={() => navigate("/")} 
            className="py-2 px-4 rounded-lg border-none cursor-pointer text-[15px] transition-all duration-200 bg-slate-600 text-white hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.25)]"
          >
            ← Back
          </button>

          {!isCameraActive ? (
            <button 
              onClick={handleStartCamera} 
              className="py-2 px-4 rounded-lg border-none cursor-pointer text-[15px] transition-all duration-200 bg-sky-500 text-white hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.25)]"
            >
              📷 Start Camera
            </button>
          ) : (
            <button 
              onClick={handleStopCamera} 
              className="py-2 px-4 rounded-lg border-none cursor-pointer text-[15px] transition-all duration-200 bg-sky-500 text-white hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.25)]"
            >
              ⏹️ Stop Camera
            </button>
          )}
        </div>
      </div>

      {/* Video Scanner */}
      <div className="flex justify-center mt-5 opacity-0 animate-[fade_1.4s_forwards]">
        <div className="p-2 rounded-[14px] bg-white/[0.12] backdrop-blur-xl shadow-[0_0_32px_rgba(0,255,255,0.35)]">
          <div 
            id="qr-reader" 
            ref={scannerRef}
            className="w-full max-w-[500px] mx-auto"
          />
          {!isCameraActive && (
            <div className="flex items-center justify-center min-h-[300px] bg-[#1a1a1a] rounded-lg text-gray-500 -mt-[300px]">
              Click "Start Camera" to begin scanning
            </div>
          )}
        </div>
      </div>

      {/* Scanned result */}
      {scanned && (
        <div className="mt-[25px] p-5 bg-white/[0.12] rounded-xl backdrop-blur-[10px] max-w-[600px] mx-auto opacity-0 animate-[fade_1.4s_forwards]">
          <h3>✅ Scanned Result</h3>
          <p className="mt-[10px] break-words text-base">{scanned}</p>
        </div>
      )}

      {error && <div className="mt-[15px] text-center text-red-400 opacity-0 animate-[fade_1s_forwards]">{error}</div>}

      <style jsx>{`
        @keyframes gradientMove {
          0% { background-position: left top; }
          50% { background-position: right bottom; }
          100% { background-position: left top; }
        }
        @keyframes fade {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
