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

  let { region, rtom, station, building, floor, room } = useParams();

  if (!room && floor) {
    room = floor;
    floor = null;
  }

  const mapACAssets = (data) =>
    data.map((item) => ({
      id: item.floor_number,
      name: "AC",
      type: "ac",
      assetId: item.floor_number,
      status: normalizeStatus(item.STATUS),

      region: item.region || null,
      rtom: item.rtom || null,
      station: item.station || null,
      building: item.rtom_building_id || null,
      room: item.location || null,
    }));

  const normalizeStatus = (status) => {
    if (!status) return "Active";
    const s = status.toLowerCase();
    if (s.includes("fault")) return "Faulty";
    if (s.includes("progress")) return "In Progress";
    return "Active";
  };

  const fetchAssets = async (locationParams) => {
    setIsLoading(true);

    try {
      const [acRes] = await Promise.all([
        fetch("https://powerprox.sltidc.lk/GET_AC_Connection.php"),
      ]);

      const acData = mapACAssets(await acRes.json());

      const allAssets = [...acData];

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


  useEffect(() => {
    fetchAssets({ region, rtom, station, building, floor, room });
  }, [region, rtom, station, building, floor, room]);

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
            {room}
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
