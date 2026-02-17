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
    }));

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

  const matchesLocation = (asset, location) => {
    for (let key in location) {
      const urlValue = location[key];

      if (!urlValue) continue;

      if (asset[key] !== urlValue) {
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
    <div className="relative text-gray-800 mb-3">
      <Navbar logout={logout} user={user} />

      {!selectedType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-10 w-[90%] max-w-md text-center">
            <h2 className="text-md sm:text-lg text-gray-600 font-semibold mb-8">
              Please select your Asset Type
            </h2>

            <div className="flex flex-col gap-5">
              <button
                onClick={() => handleSelectType("ac")}
                className="py-4 bg-blue-900 text-white sm:text-lg rounded-xl  hover:bg-blue-700 transition"
              >
                A/C
              </button>

              <button
                onClick={() => handleSelectType("light")}
                className="py-4 bg-yellow-800 text-white sm:text-lg rounded-xl  hover:bg-yellow-600 transition"
              >
                Light Panels
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
              Building A
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
