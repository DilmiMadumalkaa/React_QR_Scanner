
import React, { useState, useEffect, useMemo } from "react";
import AssetList from "../components/assests/AssetList";
import Navbar from "../components/common/navbar";
import { useAuth } from "../services/authService";
import { useNavigate, useParams } from "react-router-dom";

export default function LocationPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [assetType, setAssetType] = useState(null);
  const [allAssets, setAllAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const [selectedType, setSelectedType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  // Filter states
  const [filters, setFilters] = useState({
    region: "",
    station: "",
    building: "",
    floor: "",
    room: "",
  });

  // Get URL parameters
  let { region, rtom, station, building, floor, room } = useParams();

  // Initialize filters from URL
  useEffect(() => {
    if (region || station || building || floor || room) {
      setFilters({
        region: region || "",
        station: station || rtom || "",
        building: building || "",
        floor: floor || "",
        room: room || "",
      });
    }
  }, [region, rtom, station, building, floor, room]);

  // Map Precision AC Assets
  const mapACAssets = (data) => {
    if (!Array.isArray(data)) return [];
    return data
      .filter(item => item && item.precisionAC_ID)
      .map((item) => ({
        id: item.precisionAC_ID,
        qrTag: item.QRTag,
        model: item.Model || "Precision AC Unit",
        serialNumber: item.Serial_Number,
        manufacturer: item.Manufacturer,
        status: normalizeStatus(item.Status),
        coolingCapacity: item.Cooling_Capacity,
        location: item.Location,
        floorNumber: item.floor_number ? String(item.floor_number).trim() : "",
        region: item.Region ? String(item.Region).trim() : "",
        station: item.Station ? String(item.Station).trim() : "",
        rtom: item.RTOM ? String(item.RTOM).trim() : "",
        building: item.building_id ? String(item.building_id).trim() : "",
        installationDate: item.Installation_Date,
        powerSupply: item.Power_Supply,
        type: "ac",
      }));
  };


  // Map Light Panel Assets
  const mapLightAssets = (data) => {
    if (!Array.isArray(data)) return [];
    return data
      .filter(item => item && item.PanelID)
      .map((item) => ({
        id: item.PanelID,
        qrTag: item.QRtag,
        model: item.PanelType || "Light Panel",
        serialNumber: item.PanelSerial,
        manufacturer: item.Manufacturer,
        status: normalizeStatus(item.CurrentStatus),
        location: (item.Room || item.Location) ? String(item.Room || item.Location).trim() : "",
        region: item.Region ? String(item.Region).trim() : "",
        station: item.Station ? String(item.Station).trim() : "",
        rtom: item.RTOM ? String(item.RTOM).trim() : "",
        building: item.Building ? String(item.Building).trim() : "",
        floor: item.Floor ? String(item.Floor).trim() : "",
        room: item.Room ? String(item.Room).trim() : "",
        type: "light",
      }));
  };

  // Normalize status
  const normalizeStatus = (status) => {
    if (!status) return "Active";
    const s = String(status).toLowerCase();
    if (s.includes("faulty")) return "Faulty";
    if (s.includes("progress")) return "In Progress";
    if (s.includes("running")) return "Active";
    if (s.includes("standby")) return "Standby";
    return "Active";
  };

  // Fetch assets based on type
  const fetchAssets = async (type) => {
    setIsLoading(true);
    setError(null);
    try {
      let data = [];
      let mapped = [];

      if (type === "ac") {
        const res = await fetch("https://powerprox.sltidc.lk/GET_PrecisionAC.php");
        if (!res.ok) throw new Error("Failed to fetch AC assets");
        data = await res.json();
        mapped = mapACAssets(data);
      } else if (type === "light") {
        const res = await fetch("https://powerprox.sltidc.lk/GET_LV_Panel_ACPDB.php");
        if (!res.ok) throw new Error("Failed to fetch Light Panel assets");
        data = await res.json();
        mapped = mapLightAssets(data);
      }


      console.log(`Fetched ${mapped.length} ${type} assets`);
      setAllAssets(mapped);
      applyFilters(mapped, filters);
    } catch (err) {
      console.error("Error fetching assets:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  // Apply filters to assets
  const applyFilters = (assets, filterValues) => {
    let filtered = assets;

    if (filterValues.region && filterValues.region !== "") {
      filtered = filtered.filter(
        a => String(a.region || "").toLowerCase() === String(filterValues.region).toLowerCase()
      );
    }

    if (filterValues.station && filterValues.station !== "") {
      filtered = filtered.filter(
        a => String(a.station || "").toLowerCase() === String(filterValues.station).toLowerCase()
      );
    }

    if (filterValues.building && filterValues.building !== "") {
      filtered = filtered.filter(
        a => String(a.building || "").toLowerCase().includes(String(filterValues.building).toLowerCase())
      );
    }

    if (filterValues.floor && filterValues.floor !== "") {
      filtered = filtered.filter(
        a => String(a.floorNumber || a.floor || "").toLowerCase() === String(filterValues.floor).toLowerCase()
      );
    }

    if (filterValues.room && filterValues.room !== "") {
      filtered = filtered.filter(
        a => String(a.location || a.room || "").toLowerCase().includes(String(filterValues.room).toLowerCase())
      );
    }

    console.log(`After filtering: ${filtered.length} assets`);
    setFilteredAssets(filtered);
  };

  // Handle asset type selection
  const handleAssetTypeChange = (type) => {
    setAssetType(type);
    fetchAssets(type);
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


  // Handle filter changes
  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    applyFilters(allAssets, newFilters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const cleared = {
      region: "",
      station: "",
      building: "",
      floor: "",
      room: "",
    };
    setFilters(cleared);
    setFilteredAssets(allAssets);
  };

  // Get unique values for filter dropdowns
  const getUniqueValues = (field) => {
    let values = [];
    
    // Special handling for floor to get both floorNumber (AC) and floor (Light panels)
    if (field === "floorNumber" || field === "floor") {
      values = allAssets
        .map(a => (a.floorNumber || a.floor))
        .map(v => v && typeof v === 'string' ? v.trim() : v)
        .filter(v => v && v !== "");
    } else {
      values = allAssets
        .map(a => a[field])
        .map(v => v && typeof v === 'string' ? v.trim() : v)
        .filter(v => v && v !== "");
    }
    
    // Remove duplicates using Set and convert back to array
    const uniqueValues = Array.from(new Set(values)).sort();
    return uniqueValues;
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden relative text-gray-800">
      <div className="absolute inset-0 bg-gray-50/50"></div>

      <Navbar logout={logout} user={user} />

      <main className="pt-2 justify-center relative z-10 mx-5">
        {/* Centered Header - Matching HomePage Style */}
        <header className="text-center mb-8 mt-5">
          <p className="opacity-85 text-xs sm:text-sm md:text-[15px]">
            Explore your inventory
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Asset Locations
          </h1>
          <p className="opacity-85 text-xs sm:text-sm md:text-[15px] mt-3">
            Discover, filter, and manage assets across all locations
          </p>
        </header>

        {/* Asset Type Selection Buttons - Centered */}
        {!assetType && (
          <div className="flex justify-center mb-12">
            <div className="flex gap-4">
              <button
                onClick={() => handleAssetTypeChange("ac")}
                className="flex flex-col items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 text-blue-900 hover:shadow-lg"
              >
                <span className="text-4xl">❄️</span>
                <span>Precision AC</span>
              </button>
              <button
                onClick={() => handleAssetTypeChange("light")}
                className="flex flex-col items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 text-yellow-900 hover:shadow-lg"
              >
                <span className="text-4xl">💡</span>
                <span>Light Panel</span>
              </button>
            </div>
          </div>
        )}

        {/* Filters Section - Centered Card Style */}
        {assetType && (
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  🔍 Refine Your Search
                </h2>
                {(filters.region || filters.station || filters.building || filters.floor || filters.room) && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition font-semibold shadow-md hover:shadow-lg"
                  >
                    ✕ Clear Filters
                  </button>
                )}
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Region Filter */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Region</label>
                  <select
                    value={filters.region}
                    onChange={(e) => handleFilterChange("region", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#050E3C] bg-white"
                  >
                    <option value="">All Regions</option>
                    {getUniqueValues("region").map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                {/* Station Filter */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Station</label>
                  <select
                    value={filters.station}
                    onChange={(e) => handleFilterChange("station", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#050E3C] bg-white"
                  >
                    <option value="">All Stations</option>
                    {getUniqueValues("station").map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                {/* Building Filter */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Building</label>
                  <select
                    value={filters.building}
                    onChange={(e) => handleFilterChange("building", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#050E3C] bg-white"
                  >
                    <option value="">All Buildings</option>
                    {getUniqueValues("building").map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                {/* Floor Filter */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Floor</label>
                  <select
                    value={filters.floor}
                    onChange={(e) => handleFilterChange("floor", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#050E3C] bg-white"
                  >
                    <option value="">All Floors</option>
                    {getUniqueValues("floor").map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                {/* Room Filter */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Room</label>
                  <select
                    value={filters.room}
                    onChange={(e) => handleFilterChange("room", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#050E3C] bg-white"
                  >
                    <option value="">All Rooms</option>
                    {getUniqueValues("room").map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(filters.region || filters.station || filters.building || filters.floor || filters.room) && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-[#050E3C]">
                  <p className="text-sm text-blue-900 font-semibold">
                    <span>📌 Active Filters: </span>
                    <span className="text-blue-700">
                      {[
                        filters.region && filters.region,
                        filters.station && filters.station,
                        filters.building && filters.building,
                        filters.floor && `Floor ${filters.floor}`,
                        filters.room && filters.room,
                      ].filter(Boolean).join(" → ")}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Assets Display */}
        {assetType && (
          <div className="max-w-7xl mx-auto">
            {/* Results Header - Centered */}
            {!isLoading && !error && (
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">
                  {assetType === "ac" ? "❄️ Available AC Units" : "💡 Available Light Panels"}
                </h2>
                <p className="text-lg text-[#050E3C] font-bold mt-2">
                  {filteredAssets.length} of {allAssets.length} assets found
                </p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-16">
                <div className="inline-flex flex-col items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-[#050E3C] mb-4"></div>
                  <p className="text-lg text-gray-700 font-semibold">Loading assets...</p>
                  <p className="text-sm text-gray-500 mt-2">Please wait</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="max-w-md mx-auto">
                <div className="p-8 bg-red-50 border-l-4 border-red-600 rounded-lg text-center">
                  <p className="text-2xl mb-3">⚠️</p>
                  <p className="text-red-700 font-bold text-lg mb-4">Oops! Something went wrong</p>
                  <p className="text-red-600 text-sm mb-6">{error}</p>
                  <button
                    onClick={() => fetchAssets(assetType)}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-all"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* No Results State */}
            {!isLoading && !error && filteredAssets.length === 0 && (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-2xl font-bold text-gray-800 mb-2">No assets found</p>
                <p className="text-gray-600 mb-8">The asset you're looking for doesn't exist yet</p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-all"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => navigate("/add-asset", { 
                      state: { 
                        assetType: assetType,
                        filters: filters 
                      } 
                    })}
                    className="px-6 py-3 bg-[#050E3C] text-white rounded-lg hover:bg-[#050E3C]/90 font-semibold transition-all"
                  >
                    ➕ Add New Asset
                  </button>
                </div>
              </div>
            )}

            {/* Assets Grid - Compact Card View - Centered */}
            {!isLoading && !error && filteredAssets.length > 0 && (
              <div className="mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center px-4">
                  {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-200 overflow-hidden cursor-pointer h-full w-full max-w-[180px]"
                    onClick={() => navigate("/logfault", { state: { asset } })}
                  >
                    {/* Card Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#050E3C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Status Badge - Top Right */}
                    <div className="absolute top-2 right-2 z-10">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        asset.status === "Active" ? "bg-green-400 text-green-900" :
                        asset.status === "Faulty" ? "bg-red-400 text-red-900" :
                        "bg-yellow-400 text-yellow-900"
                      }`}>
                        {asset.status === "Active" ? "✓" : asset.status === "Faulty" ? "⚠" : "⏸"}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-3 relative z-5">
                      {/* Asset Icon & Type */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="text-2xl">
                          {asset.type === "ac" ? "❄️" : "💡"}
                        </div>
                      </div>

                      {/* Asset Name */}
                      <h3 className="text-xs font-bold text-gray-900 truncate mb-1 group-hover:text-[#050E3C] transition">
                        {asset.model || asset.name}
                      </h3>

                      {/* QR Tag */}
                      <p className="text-xs text-gray-500 font-mono truncate mb-2">
                        {asset.qrTag || asset.id}
                      </p>

                      {/* Location Info - Compact */}
                      <div className="text-xs space-y-0.5 text-gray-700 border-t pt-2">
                        {asset.region && (
                          <p className="truncate"><span className="font-semibold text-gray-900">{asset.region}</span></p>
                        )}
                        {asset.station && (
                          <p className="truncate text-gray-600"><span className="text-gray-500">📍</span> {asset.station}</p>
                        )}
                        {asset.building && (
                          <p className="truncate text-gray-600">{asset.building}</p>
                        )}
                        {(asset.floorNumber || asset.floor) && (
                          <p className="truncate text-gray-600">Floor: {asset.floorNumber || asset.floor}</p>
                        )}
                      </div>

                      {/* Serial Number - AC only */}
                      {asset.type === "ac" && asset.serialNumber && (
                        <p className="text-xs text-gray-500 truncate mt-1 font-mono">
                          SN: {asset.serialNumber}
                        </p>
                      )}
                    </div>

                    {/* Hover Action Button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050E3C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2 rounded-lg">
                      <button className="text-white text-xs font-bold px-2 py-1 bg-[#050E3C]/80 rounded hover:bg-[#050E3C] transition">
                        Report →
                      </button>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Asset Type Selected - Empty State */}
        {!assetType && (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">📍</p>
            <p className="text-2xl font-bold text-gray-800 mb-2">Choose an asset type</p>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Select either Precision AC or Light Panel above to start exploring your assets
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
