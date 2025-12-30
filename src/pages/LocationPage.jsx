import React from "react";
import AssetList from "../components/assests/AssetList";
import Navbar from "../components/common/navbar";
import { useAuth } from "../services/authService";

export default function LocationPage() {
  const { logout, user } = useAuth();
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
  );
}
