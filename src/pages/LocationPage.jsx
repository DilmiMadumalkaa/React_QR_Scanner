import React, { useEffect, useState } from "react";
import AssetList from "../components/assests/AssetList";
import Navbar from "../components/common/navbar";
import { useAuth } from "../services/authService";
import { useNavigate, useParams } from "react-router-dom";
import AssestSearchBar from "../components/assests/AssestSearchBar";

export default function LocationPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { roomId } = useParams();

  const mapACAssets = (data) =>
    data.map((item) => ({
      id: item.ac_outdoor_id,
      name: "AC",
      assetId: item.ac_outdoor_id,
      type: "ac",
      status: normalizeStatus(item.STATUS),
      roomId: item.rtom_building_id,
    }));

  const mapLVPanelAssets = (data) =>
    data.map((item) => ({
      id: item.PanelID,
      name: "Light Panel",
      assetId: item.PanelSerial,
      type: "light",
      status: normalizeStatus(item.STATUS),
      roomId: item.Room,
    }));

  const mapIndoorUnitAssets = (data) =>
    data.map((item) => ({
      id: item.INDOOR_ID,
      name: "AC Indoor",
      assetId: item.INDOOR_ID,
      type: "ac",
      status: normalizeStatus(item.STATUS),
      roomId: item.ROOM_ID,
    }));

  const normalizeStatus = (status) => {
    if (!status) return "Active";
    const s = status.toLowerCase();
    if (s.includes("fault")) return "Faulty";
    if (s.includes("progress")) return "In Progress";
    return "Active";
  };

  const fetchAssets = async (roomId) => {
    setIsLoading(true);

    try {
      const [acRes, lvPanelRes, indoorRes] = await Promise.all([
        fetch("https://powerprox.sltidc.lk/GET_AC_Connection.php"),
        fetch("https://powerprox.sltidc.lk/GET_LV_Panel_ACPDB.php"),
        fetch("https://powerprox.sltidc.lk/GET_AC_Indoor_Units.php"),
      ]);

      const acData = mapACAssets(await acRes.json());
      const lvPanelData = mapLVPanelAssets(await lvPanelRes.json());
      const indoorData = mapIndoorUnitAssets(await indoorRes.json());

      // FILTER BY ROOM
      const filteredAssets = [...acData, ...lvPanelData, ...indoorData].filter(
        (asset) => asset.roomId === roomId,
      );

      setAssets(filteredAssets);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchAssets(roomId);
    }
  }, [roomId]);

  return (
    <div className="relative text-gray-800">
      <Navbar logout={logout} user={user} />

      <main className="pt-2 justify-center relative z-10">
        <div className="px-2 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex flex-row items-center gap-1 text-[#050E3C] mb-4 text-md font-semibold sm:mb-1"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Building A
          </h1>
          <p className="mt-1 text-md font-medium text-gray-500 text-center">
            {roomId}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3 items-center">
            <div className="hidden md:block" />

            <div className="w-full md:mx-auto">
              <AssestSearchBar />
            </div>

            <div className="flex justify-center md:justify-end">
              <button
                onClick={() => navigate("/add-asset")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#050E3C] text-white rounded-lg"
              >
                Add New Asset
              </button>
            </div>
          </div>

          <div className="mt-10">
            {isLoading && (
              <p className="text-center text-gray-500">Loading assets...</p>
            )}

            {!isLoading && <AssetList assets={assets} basePath="/logfault" />}
          </div>
        </div>
      </main>
    </div>
  );
}

// import React from "react";
// import AssetList from "../components/assests/AssetList";
// import Navbar from "../components/common/navbar";
// import { useAuth } from "../services/authService";
// import { useNavigate } from "react-router-dom";
// import AssestSearchBar from "../components/assests/AssestSearchBar";

// export default function LocationPage() {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();

//   const assets = [
//     {
//       id: "1",
//       name: "AC Unit - Office 205",
//       assetId: "AC-205",
//       type: "AC",
//       status: "In Progress",
//     },
//     {
//       id: "2",
//       name: "Main Hall Light Panel",
//       assetId: "LT-112",
//       type: "Light",
//       status: "Faulty",
//     },
//     {
//       id: "3",
//       name: "Ceiling Fan - Floor 3",
//       assetId: "FN-330",
//       type: "Fan",
//       status: "Active",
//     },
//   ];

//   return (
//     <div className="relative text-gray-800">
//       {/* Navbar */}
//       <Navbar logout={logout} user={user} />
//       <main className="pt-2 justify-center relative z-10">
//         <div className="px-2 sm:px-6">
//           <button
//             type="button"
//             onClick={() => navigate("/")}
//             className="flex flex-row items-center gap-1 text-[#050E3C] mb-4 text-md font-semibold sm:mb-1"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="15px"
//               viewBox="0 -960 960 960"
//               width="15px"
//               fill="#050E3C"
//             >
//               <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
//             </svg>
//             Back
//           </button>
//           <h1 className="text-3xl font-bold text-gray-900 text-center">
//             Building A
//           </h1>
//           <p className="mt-1 text-md font-medium text-gray-500 text-center">
//             Floor - Room Name
//           </p>

//           <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3 items-center">
//             {/* Left empty column (for balance on desktop) */}
//             <div className="hidden md:block" />

//             {/* Search Bar (centered) */}
//             <div className="w-full md:mx-auto">
//               <AssestSearchBar />
//             </div>

//             {/* Add New Asset Button (right aligned) */}
//             <div className="flex justify-center md:justify-end">
//               <button
//                 onClick={() => navigate("/add-asset")}
//                 className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#050E3C] text-white rounded-lg hover:bg-[#050E3C]/90 transition-all font-medium shadow-md hover:shadow-lg active:scale-95"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 Add New Asset
//               </button>
//             </div>
//           </div>

//           <div className="mt-10">
//             <AssetList assets={assets} basePath="/logfault" />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


