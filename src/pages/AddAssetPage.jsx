import React from "react";
import AddAssetForm from "../components/assests/AddAssetForm";
import { useNavigate } from "react-router-dom";

export default function AddAssetPage() {
  const navigate = useNavigate();
  return (
    <div className="relative text-gray-800 px-4 sm:px-6 py-3">
      <div className="max-w-2xl mx-auto px-5">
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
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Add New Asset
        </h1>
        <p className="text-md text-gray-500 text-center mb-8">
          Register a new asset to the system
        </p>

        <AddAssetForm />
      </div>
    </div>
  );
}
