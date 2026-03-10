import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/authService";
import Navbar from "../components/common/navbar";
import HomeCard from "../components/HomeCard";
import MyComplaintsCard from "../components/MyComplaintsCard";

export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [filters, setFilters] = useState({
    region: "",
    rtom: "",
    station: "",
    building: "",
    floor: "",
    room: "",
  });

  // Popup state
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    asset: null,
    isNew: false,
  });

  // Handle search button click
  const handleSearch = () => {
    if (!filters.assetID) {
      setPopup({ show: true, message: "", asset: null, isNew: false });
      return;
    }

    const assetExists = existingAssets.find(
      (asset) => asset.assetID === filters.assetID,
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

  // Popup confirm button
  const handlePopupConfirm = () => {
    if (popup.isNew) {
      navigate("/add-asset", { state: { asset: popup.asset } });
    } else {
      navigate("/logfault", { state: { asset: popup.asset } });
    }
    setPopup({ show: false, message: "", asset: null, isNew: false });
  };

  // Popup cancel button
  const handlePopupCancel = () => {
    setPopup({ show: false, message: "", asset: null, isNew: false });
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden relative text-gray-800">
      {/* Navbar */}
      <Navbar logout={logout} user={user} />

      {/* Main Content */}
      <main className="justify-center relative z-10 mx-10">
        <header className="text-center mt-5">
          <p className="opacity-85 text-xs sm:text-sm md:text-[15px]">
            Welcome to
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Location Fault Logger
          </h1>
          <p className="opacity-85 text-xs sm:text-sm md:text-[15px] mt-3">
            Track, report, and monitor location-based issues in real time
          </p>
        </header>

        <div className="mx-10 mt-5 space-y-5 lg:block">
          {/* Three Status Cards */}
          <div className="sm:mx-24 mx-4 grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4">
            <HomeCard
              title="Total Faults"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="22px"
                  viewBox="0 -960 960 960"
                  width="22px"
                  fill="#DC2626"
                >
                  <path d="M440-400v-360h80v360h-80Zm0 200v-80h80v80h-80Z" />
                </svg>
              }
              value={7}
              iconBg="bg-red-50"
              textColor="text-red-600"
            />
            <HomeCard
              title="In Progress"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#CA8A04"
                >
                  <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q82 0 155.5 35T760-706v-94h80v240H600v-80h110q-41-56-101-88t-129-32q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200q105 0 183.5-68T756-440h82q-15 137-117.5 228.5T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
                </svg>
              }
              value={2}
              iconBg="bg-yellow-50"
              textColor="text-yellow-600"
            />
            <HomeCard
              title="Completed Faults"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#16A34A"
                >
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              }
              value={2}
              iconBg="bg-green-50"
              textColor="text-green-600"
            />
          </div>

          <div className="space-y-3">
            {/* Scan QR Button */}
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/scan")}
                className="flex items-center justify-center w-[300px] gap-2 bg-[#050E3C] text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-[#050E3C]/90 transition-all shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 -960 960 960"
                  fill="white"
                >
                  <path d="M520-120v-80h80v80h-80Zm-80-80v-200h80v200h-80Zm320-120v-160h80v160h-80Zm-80-160v-80h80v80h-80Zm-480 80v-80h80v80h-80Zm-80-80v-80h80v80h-80Zm360-280v-80h80v80h-80ZM180-660h120v-120H180v120Zm-60 60v-240h240v240H120Zm60 420h120v-120H180v120Zm-60 60v-240h240v240H120Zm540-540h120v-120H660v120Zm-60 60v-240h240v240H600Z" />
                </svg>
                Scan the QR Code
              </button>
            </div>

            <div className="text-center text-sm sm:text-base"> or </div>

            {/* Search & Filters */}
            <div className="p-4 mx-10 border border-bg-gray-50 rounded-lg shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                Search Assets
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {/* Building Dropdown */}
                <div>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
                    value={filters.building}
                    onChange={(e) =>
                      setFilters({ ...filters, building: e.target.value })
                    }
                  >
                    <option value="">Select Building</option>
                    <option value="Building A">Building A</option>
                    <option value="Building B">Building B</option>
                    <option value="Building C">Building C</option>
                  </select>
                </div>

                {/* Floor Dropdown */}
                <div>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
                    value={filters.floor}
                    onChange={(e) =>
                      setFilters({ ...filters, floor: e.target.value })
                    }
                  >
                    <option value="">Select Floor</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                {/* Asset Name Dropdown */}
                <div>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
                    value={filters.assetName}
                    onChange={(e) =>
                      setFilters({ ...filters, assetName: e.target.value })
                    }
                  >
                    <option value="">Select Asset</option>
                    <option value="AC Unit">AC Unit</option>
                    <option value="Fire Extinguisher">Fire Extinguisher</option>
                    <option value="Generator">Generator</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSearch}
                    className="w-[200px] bg-[#050E3C] text-white py-2 px-4 rounded-lg hover:bg-[#050E3C]/90 transition-all text-sm sm:text-base font-medium"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* My Complaints */}
          <div className="px-10">
            <MyComplaintsCard />
          </div>
        </div>
      </main>

      {/* Blue-Themed Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay with blur */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Modal content */}
          <div
            className="relative bg-white rounded-xl shadow-xl p-6 w-96 mx-4 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-[#050E3C] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
                  />
                </svg>
              </div>

              {/* Message */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">
                {popup.isNew ? "New Asset" : "Asset Already Exists"}
              </h3>
              <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
                {popup.message}
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-4 w-full">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePopupConfirm();
                  }}
                  className="flex-1 bg-[#050E3C] hover:bg-[#050E3C]/90 text-white font-medium py-2 rounded-lg transition text-sm sm:text-base"
                >
                  {popup.isNew ? "Add Asset" : "Report Fault"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePopupCancel();
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 font-medium py-2 rounded-lg transition text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="min-h-screen bg-white overflow-hidden relative text-gray-800">
  //     {/* Navbar */}
  //     <Navbar logout={logout} user={user} />

  //     {/* Main Content */}
  //     <main className="pt-2 justify-center relative z-10 mx-5">
  //       <header className="text-center mb-[35px] mt-5">
  //         <p className="opacity-85 text-xs sm:text-sm md:text-[15px]">
  //           Welcome to
  //         </p>
  //         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
  //           Location Fault Logger
  //         </h1>
  //         <p className="opacity-85 text-xs sm:text-sm md:text-[15px] mt-3">
  //           Track, report, and monitor location-based issues in real time
  //         </p>
  //       </header>

  //       {/* Two Column Layout */}
  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8">
  //         {/* Left Column: Cards and My Complaints - Hidden on mobile/tablet */}
  //         <div className="space-y-3 hidden lg:block">
  //           {/* Three Status Cards */}
  //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  //             <HomeCard
  //               title="Total Faults"
  //               icon="!"
  //               value={7}
  //               subtitle="All reported issues"
  //               iconBg="bg-red-50"
  //               iconColor="text-red-600"
  //             />
  //             <HomeCard
  //               title="In Progress"
  //               icon="⏱"
  //               value={2}
  //               subtitle="Currently being resolved"
  //               iconBg="bg-blue-50"
  //               iconColor="text-yellow-600"
  //             />
  //             <HomeCard
  //               title="Completed Faults"
  //               icon="✓"
  //               value={2}
  //               subtitle="Successfully resolved"
  //               iconBg="bg-green-50"
  //               iconColor="text-green-600"
  //             />
  //           </div>

  //           {/* My Complaints */}
  //           <div>
  //             <MyComplaintsCard />
  //           </div>
  //         </div>

  //         {/* Right Column: Scan QR and Search Assets */}
  //         <div className="space-y-6">
  //           {/* Scan QR Button */}
  //           <div className="flex justify-center">
  //             <button
  //               onClick={() => navigate("/scan")}
  //               className="flex items-center justify-center w-[300px] gap-2 bg-[#050E3C] text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-[#050E3C]/90 transition-all shadow-lg"
  //             >
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 className="h-5 w-5"
  //                 viewBox="0 -960 960 960"
  //                 fill="white"
  //               >
  //                 <path d="M520-120v-80h80v80h-80Zm-80-80v-200h80v200h-80Zm320-120v-160h80v160h-80Zm-80-160v-80h80v80h-80Zm-480 80v-80h80v80h-80Zm-80-80v-80h80v80h-80Zm360-280v-80h80v80h-80ZM180-660h120v-120H180v120Zm-60 60v-240h240v240H120Zm60 420h120v-120H180v120Zm-60 60v-240h240v240H120Zm540-540h120v-120H660v120Zm-60 60v-240h240v240H600Z" />
  //               </svg>
  //               Scan the QR Code
  //             </button>
  //           </div>

  //           <div className="text-center text-sm sm:text-base"> or </div>

  //           {/* Search & Filters */}
  //           <div className="p-4 border border-bg-gray-50 rounded-lg shadow-sm">
  //             <h2 className="text-base sm:text-lg font-semibold mb-4">
  //               Search Assets
  //             </h2>
  //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //               {/* Building Dropdown */}
  //               <div>
  //                 <select
  //                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
  //                   value={filters.building}
  //                   onChange={(e) =>
  //                     setFilters({ ...filters, building: e.target.value })
  //                   }
  //                 >
  //                   <option value="">Select Building</option>
  //                   <option value="Building A">Building A</option>
  //                   <option value="Building B">Building B</option>
  //                   <option value="Building C">Building C</option>
  //                 </select>
  //               </div>

  //               {/* Floor Dropdown */}
  //               <div>
  //                 <select
  //                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
  //                   value={filters.floor}
  //                   onChange={(e) =>
  //                     setFilters({ ...filters, floor: e.target.value })
  //                   }
  //                 >
  //                   <option value="">Select Floor</option>
  //                   <option value="1">1</option>
  //                   <option value="2">2</option>
  //                   <option value="3">3</option>
  //                 </select>
  //               </div>

  //               {/* Asset Name Dropdown */}
  //               <div>
  //                 <select
  //                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
  //                   value={filters.assetName}
  //                   onChange={(e) =>
  //                     setFilters({ ...filters, assetName: e.target.value })
  //                   }
  //                 >
  //                   <option value="">Select Asset</option>
  //                   <option value="AC Unit">AC Unit</option>
  //                   <option value="Fire Extinguisher">Fire Extinguisher</option>
  //                   <option value="Generator">Generator</option>
  //                 </select>
  //               </div>

  //               {/* Asset ID Input */}
  //               <div>
  //                 <input
  //                   type="text"
  //                   placeholder="Enter Asset ID"
  //                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
  //                   value={filters.assetID}
  //                   onChange={(e) =>
  //                     setFilters({ ...filters, assetID: e.target.value })
  //                   }
  //                 />
  //               </div>

  //               {/* Search Button */}
  //               <div className="sm:col-span-2 flex justify-end">
  //                 <button
  //                   onClick={handleSearch}
  //                   className="w-[200px] bg-[#050E3C] text-white py-2 px-4 rounded-lg hover:bg-[#050E3C]/90 transition-all text-sm sm:text-base font-medium"
  //                 >
  //                   Search
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </main>

  //     {/* Blue-Themed Popup Modal */}
  //     {popup.show && (
  //       <div className="fixed inset-0 flex items-center justify-center z-50">
  //         {/* Background overlay with blur */}
  //         <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

  //         {/* Modal content */}
  //         <div
  //           className="relative bg-white rounded-xl shadow-xl p-6 w-96 mx-4 animate-scaleUp"
  //           onClick={(e) => e.stopPropagation()}
  //         >
  //           <div className="flex flex-col items-center">
  //             {/* Icon */}
  //             <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-[#050E3C] text-white">
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 className="h-8 w-8"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //                 stroke="currentColor"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth={2}
  //                   d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
  //                 />
  //               </svg>
  //             </div>

  //             {/* Message */}
  //             <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">
  //               {popup.isNew ? "New Asset" : "Asset Already Exists"}
  //             </h3>
  //             <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
  //               {popup.message}
  //             </p>

  //             {/* Buttons */}
  //             <div className="flex justify-center gap-4 w-full">
  //               <button
  //                 onClick={(e) => {
  //                   e.stopPropagation();
  //                   handlePopupConfirm();
  //                 }}
  //                 className="flex-1 bg-[#050E3C] hover:bg-[#050E3C]/90 text-white font-medium py-2 rounded-lg transition text-sm sm:text-base"
  //               >
  //                 {popup.isNew ? "Add Asset" : "Report Fault"}
  //               </button>
  //               <button
  //                 onClick={(e) => {
  //                   e.stopPropagation();
  //                   handlePopupCancel();
  //                 }}
  //                 className="flex-1 bg-gray-200 hover:bg-gray-300 font-medium py-2 rounded-lg transition text-sm sm:text-base"
  //               >
  //                 Close
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
}
