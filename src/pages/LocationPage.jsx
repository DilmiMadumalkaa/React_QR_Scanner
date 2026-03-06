import React, { useEffect, useState, useMemo } from "react";
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
  const [selectedType, setSelectedType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  let { region, rtom, station, building, floor, room } = useParams();

  if (!room && floor) {
    room = floor;
    floor = null;
  }

  const mapACAssets = (data) =>
    data.map((item) => ({
      id: item.floor_number,
      name: "A/C",
      type: "ac",
      assetId: item.floor_number,
      status: normalizeStatus(item.STATUS),

      region: item.region || null,
      rtom: item.rtom || null,
      station: item.station || null,
      building: item.rtom_building_id || null,
      floor: null,
      room: item.location || null,

      qrTag:item.QR_loc,
    }));

  const mapLightAssets = (data) =>
    data.map((item) => ({
      id: item.PanelSerial,
      name: "Light Panel",
      type: "light",
      assetId: item.PanelSerial,
      status: normalizeStatus(item.STATUS),

      region: item.Region || null,
      rtom: item.RTOM || null,
      station: item.Station || null,
      building: item.Building || null,
      floor: null,
      room: item.Room || null,

      qrTag: item.QRtag,
      model: item.PanelType,
    }));

  const mapPACAssets = (data) => {
    if (!Array.isArray(data)) return [];
    return data
      .filter((item) => item && item.precisionAC_ID)
      .map((item) => ({
        id: item.Serial_Number,
        name: "Precision A/C",
        type: "pac",
        assetId: item.Serial_Number,
        status: normalizeStatus(item.STATUS),

        region: item.Region ? String(item.Region).trim() : null,
        rtom: item.RTOM ? String(item.RTOM).trim() : null,
        station: item.Station ? String(item.Station).trim() : null,
        building: item.building_id ? String(item.building_id).trim() : null,
        floor: item.floor_number ? String(item.floor_number).trim() : null,
        room: item.Location,

        qrTag: item.QRTag,
        model: item.Model || "Precision AC Unit",
        serialNumber: item.Serial_Number,
        manufacturer: item.Manufacturer,
        coolingCapacity: item.Cooling_Capacity,
        installationDate: item.Installation_Date,
        powerSupply: item.Power_Supply,
      }));
  };

  const normalizeStatus = (status) => {
    if (!status) return "Active";
    const s = status.toLowerCase();
    if (s.includes("fault")) return "Faulty";
    if (s.includes("progress")) return "In Progress";
    return "Active";
  };

  const fetchAssets = async (locationParams, type) => {
    setIsLoading(true);

    try {
      let allAssets = [];

      if (type === "ac") {
        const res = await fetch(
          "https://powerprox.sltidc.lk/GET_AC_Connection.php",
        );
        const data = await res.json();
        allAssets = mapACAssets(data);
      }

      if (type === "light") {
        const res = await fetch(
          "https://powerprox.sltidc.lk/GET_LV_Panel_ACPDB.php",
        );
        const data = await res.json();
        allAssets = mapLightAssets(data);
      }

      if (type === "pac") {
        const res = await fetch(
          "https://powerprox.sltidc.lk/GET_PrecisionAC.php",
        );
        const data = await res.json();
        allAssets = mapPACAssets(data);
      }

      const filteredAssets = allAssets.filter((asset) =>
        matchesLocation(asset, locationParams),
      );

      setAssets(filteredAssets);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const normalize = (value) => value?.toString().trim().toLowerCase();

  const matchesLocation = (asset, location) => {
    for (let key in location) {
      const urlValue = location[key];
      if (!urlValue) continue;

      if (normalize(asset[key]) !== normalize(urlValue)) {
        return false;
      }
    }
    return true;
  };

  // FILTERING HAPPENS HERE
  const filteredAssets = useMemo(() => {
    if (!searchTerm) return assets;

    return assets.filter((asset) =>
      [
        asset.assetId,
        asset.region,
        asset.rtom,
        asset.station,
        asset.building,
        asset.floor,
        asset.room,
      ].some((field) =>
        field?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, assets]);

  const handleSelectType = (type) => {
    setSelectedType(type);

    fetchAssets({ region, rtom, station, building, floor, room }, type);
  };

  return (
    <div className="relative text-gray-800 mb-3 mx-3">
      <Navbar logout={logout} user={user} />

      {!selectedType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-10 w-[90%] max-w-md text-center">
            <h2 className="text-md sm:text-lg text-gray-600 font-semibold mb-8">
              Please select your Asset Type
            </h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleSelectType("ac")}
                className="flex flex-col items-center gap-1 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 text-blue-800 hover:shadow-md hover:shadow-blue-100"
              >
                <span className="text-4xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30px"
                    viewBox="0 -960 960 960"
                    width="35px"
                    fill="#2c5282"
                  >
                    <path d="M240-280h480v-120H240v120Zm-80 120q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
                  </svg>
                </span>
                <span>A/C</span>
              </button>
              <button
                onClick={() => handleSelectType("light")}
                className="flex flex-col items-center gap-1 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 text-yellow-800 hover:shadow-md hover:shadow-yellow-100"
              >
                <span className="text-4xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30px"
                    viewBox="0 -960 960 960"
                    width="35px"
                    fill="#854D0E"
                  >
                    <path d="M423.5-103.5Q400-127 400-160h160q0 33-23.5 56.5T480-80q-33 0-56.5-23.5ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z" />
                  </svg>
                </span>
                <span>Light Panel</span>
              </button>
              <button
                onClick={() => handleSelectType("pac")}
                className="flex flex-col items-center gap-1 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 text-green-800 hover:shadow-md hover:shadow-green-100"
              >
                <span className="text-4xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30px"
                    viewBox="0 -960 960 960"
                    width="30px"
                    fill="#276749"
                  >
                    <path d="M440-80v-166L310-118l-56-56 186-186v-80h-80L174-254l-56-56 128-130H80v-80h166L118-650l56-56 186 186h80v-80L254-786l56-56 130 128v-166h80v166l130-128 56 56-186 186v80h80l186-186 56 56-128 130h166v80H714l128 130-56 56-186-186h-80v80l186 186-56 56-130-128v166h-80Z" />
                  </svg>
                </span>
                <span>Precision A/C</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedType && (
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
              {building}
            </h1>
            <p className="mt-1 text-md font-medium text-gray-500 text-center">
              {room}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3 items-center">
              <div className="hidden md:block" />

              <div className="w-full md:mx-auto">
                <AssestSearchBar onSearch={setSearchTerm} />
              </div>
            </div>

            <div className="mt-10">
              {isLoading && (
                <p className="text-center text-gray-500">Loading assets...</p>
              )}

              {!isLoading && (
                <AssetList assets={filteredAssets} basePath="/logfault" />
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
