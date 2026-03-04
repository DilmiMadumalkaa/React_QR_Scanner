import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FaultForm from "../components/faults/FaultForm";

export default function LogFaultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const asset = location.state?.asset;

  return (
    <>
      <div className="relative text-gray-800 sm:px-6 py-3">
        <div className="max-w-2xl mx-auto px-2">
          <button
            type="button"
            onClick={() => navigate("/location")}
            className="flex flex-row items-center gap-1 text-[#050E3C] mb-2 text-md font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15px"
              viewBox="0 -960 960 960"
              width="15px"
              fill="#050E3C"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
            Back
          </button>

          <h1 className="text-3xl text-center font-bold mb-2">Report Fault</h1>

          {/* Report Fault Form */}
          <FaultForm asset={asset} />
        </div>
      </div>
    </>
  );
}
