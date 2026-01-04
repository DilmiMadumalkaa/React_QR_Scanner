<<<<<<< HEAD
import React from "react";
import AssetList from "../components/assests/AssetList";
import Navbar from "../components/common/navbar";
import { useAuth } from "../services/authService";

export default function LocationPage() {
  const { logout, user } = useAuth();
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssetList from "../components/assests/AssetList";

export default function LocationPage() {
  const navigate = useNavigate();

>>>>>>> origin/Timasha
  const assets = [
    {
      id: "1",
      name: "AC Unit - Office 205",
      assetId: "AC-205",
      type: "AC",
      status: "In Progress",
    },
    {
      id: "2",
      name: "Main Hall Light Panel",
      assetId: "LT-112",
      type: "Light",
      status: "Faulty",
    },
    {
      id: "3",
      name: "Ceiling Fan - Floor 3",
      assetId: "FN-330",
      type: "Fan",
      status: "Active",
    },
  ];

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-white overflow-hidden relative text-gray-800">
      {/* Navbar */}
      <Navbar logout={logout} user={user} />
      <main className="pt-24 justify-center relative z-10 mx-5">
        <div className="px-4 sm:px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Building A
          </h1>
          <p className="mt-1 text-md text-gray-500 text-center">
            Digital Platform Section
          </p>

          <div className="mt-6">
            <AssetList assets={assets} basePath="/logfault" />
          </div>
        </div>
      </main>
    </div>
=======
    <>
      <div className="px-4 sm:px-6 py-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Building A
        </h1>
        <p className="mt-1 text-md text-gray-500 text-center">
          Digital Platform Section
        </p>

        {/* Add New Asset Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => navigate('/add-asset')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#050E3C] text-white rounded-lg hover:bg-[#050E3C]/90 transition-all font-medium shadow-md hover:shadow-lg active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Asset
          </button>
        </div>

        <div className="mt-6">
          <AssetList assets={assets} />
        </div>
      </div>
    </>
>>>>>>> origin/Timasha
  );
}
