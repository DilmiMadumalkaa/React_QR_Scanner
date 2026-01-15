import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/authService";
import Navbar from "../components/common/navbar";
import Sidebar from "../components/Sidebar";

import HomeCard from "../components/HomeCard";
import MyComplaintsCard from "../components/MyComplaintsCard";

export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Filters state
  const [filters, setFilters] = useState({
    building: "",
    floor: "",
    assetName: "",
    assetID: "",
  });

  // Popup state
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    asset: null,
    isNew: false,
  });

  // Example existing assets
  const existingAssets = [
    { assetID: "A001", building: "Building A", floor: "1", assetName: "AC Unit" },
    { assetID: "B002", building: "Building B", floor: "2", assetName: "Generator" },
  ];

  // Handle search
  const handleSearch = () => {
    if (!filters.assetID) {
      setPopup({
        show: true,
        message: "Please enter an Asset ID to search",
        asset: null,
        isNew: false,
      });
      return;
    }

    const assetExists = existingAssets.find(
      (asset) => asset.assetID === filters.assetID
    );

    if (assetExists) {
      setPopup({
        show: true,
        message: `Asset ID ${filters.assetID} already exists for ${assetExists.assetName}`,
        asset: assetExists,
        isNew: false,
      });
    } else {
      setPopup({
        show: true,
        message: `Asset ID ${filters.assetID} not found. Would you like to add this new asset?`,
        asset: { ...filters },
        isNew: true,
      });
    }
  };

  const handlePopupConfirm = () => {
    if (popup.isNew) {
      navigate("/add-asset", { state: { asset: popup.asset } });
    } else {
      navigate("/logfault", { state: { asset: popup.asset } });
    }
    setPopup({ show: false, message: "", asset: null, isNew: false });
  };

  const handlePopupCancel = () => {
    setPopup({ show: false, message: "", asset: null, isNew: false });
  };

  return (
    <div className="min-h-screen bg-white relative text-gray-800">
      <Navbar logout={logout} user={user} />

      <main className="pt-2 relative z-10 mx-5">
        <header className="text-center mb-8 mt-5">
          <p className="opacity-85 text-sm">Welcome to</p>
          <h1 className="text-4xl font-bold">Location Fault Logger</h1>
          <p className="opacity-85 text-sm mt-3">
            Track, report, and monitor location-based issues
          </p>
        </header>

        {/* Scan QR */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/scan")}
            className="w-[500px] bg-[#050E3C] text-white px-6 py-3 rounded-lg font-medium shadow-lg"
          >
            Scan the QR Code
          </button>
        </div>

        {/* Search */}
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Search Assets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <select
              className="border rounded px-3 py-2"
              value={filters.building}
              onChange={(e) =>
                setFilters({ ...filters, building: e.target.value })
              }
            >
              <option value="">Building</option>
              <option value="Building A">Building A</option>
              <option value="Building B">Building B</option>
            </select>

            <select
              className="border rounded px-3 py-2"
              value={filters.floor}
              onChange={(e) =>
                setFilters({ ...filters, floor: e.target.value })
              }
            >
              <option value="">Floor</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>

            <select
              className="border rounded px-3 py-2"
              value={filters.assetName}
              onChange={(e) =>
                setFilters({ ...filters, assetName: e.target.value })
              }
            >
              <option value="">Asset</option>
              <option value="AC Unit">AC Unit</option>
              <option value="Generator">Generator</option>
            </select>

            <input
              className="border rounded px-3 py-2"
              placeholder="Asset ID"
              value={filters.assetID}
              onChange={(e) =>
                setFilters({ ...filters, assetID: e.target.value })
              }
            />

            <button
              onClick={handleSearch}
              className="bg-[#050E3C] text-white rounded-lg"
            >
              Search
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <HomeCard title="Total Faults" value={7} />
            <HomeCard title="In Progress" value={2} />
            <HomeCard title="Completed" value={2} />
          </div>

          <MyComplaintsCard />
        </div>
      </main>

      {/* Popup */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-xl p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-2 text-center">
              {popup.isNew ? "New Asset" : "Asset Exists"}
            </h3>
            <p className="text-center mb-6">{popup.message}</p>

            <div className="flex gap-3">
              <button
                onClick={handlePopupConfirm}
                className="flex-1 bg-[#050E3C] text-white py-2 rounded-lg"
              >
                {popup.isNew ? "Add Asset" : "Log Fault"}
              </button>
              <button
                onClick={handlePopupCancel}
                className="flex-1 bg-gray-200 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
