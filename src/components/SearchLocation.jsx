import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./common/Loader";

const SearchLocation = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    region: "",
    rtom: "",
    station: "",
    building: "",
    floor: "",
    room: "",
  });

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from APIs on component mount
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setDataLoading(true);
        const [precisionResponse, lightResponse, acConnectionResponse] =
          await Promise.all([
            fetch("https://powerprox.sltidc.lk/GET_PrecisionAC.php"),
            fetch("https://powerprox.sltidc.lk/GET_LV_Panel_ACPDB.php"),
            fetch("https://powerprox.sltidc.lk/GET_AC_Connection.php"),
          ]);

        const precisionData = await precisionResponse.json();
        const lightData = await lightResponse.json();
        const acConnectionData = await acConnectionResponse.json();

        // Combine all datasets
        const combined = [
          ...(Array.isArray(precisionData) ? precisionData : []),
          ...(Array.isArray(lightData) ? lightData : []),
          ...(Array.isArray(acConnectionData) ? acConnectionData : []),
        ];

        setApiData(combined);
      } catch (err) {
        console.error("Error fetching location data:", err);
        setError("Failed to load location data");
      } finally {
        setDataLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  // Extract unique values from API data based on selected filters
  const getUniqueValues = (field) => {
    let filtered = apiData;

    // Apply previous filters to get contextual options
    if (filters.region) {
      filtered = filtered.filter(
        (item) => (item.region || item.Region) === filters.region,
      );
    }
    if (filters.rtom) {
      filtered = filtered.filter(
        (item) => (item.rtom || item.RTOM) === filters.rtom,
      );
    }
    if (filters.station) {
      filtered = filtered.filter(
        (item) => (item.station || item.Station) === filters.station,
      );
    }
    if (field !== "region" && filters.building) {
      filtered = filtered.filter((item) =>
        (item.rtom_building_id || item.Building)?.includes(filters.building),
      );
    }
    if (field !== "floor" && filters.floor) {
      filtered = filtered.filter(
        (item) => (item.floor_number || item.Floor) === filters.floor,
      );
    }

    // Extract unique values for the requested field
    const values = filtered
      .map((item) => {
        switch (field) {
          case "region":
            return item.region || item.Region;
          case "rtom":
            return item.rtom || item.RTOM;
          case "station":
            return item.station || item.Station;
          case "building":
            return item.rtom_building_id || item.Building;
          case "floor":
            return item.floor_number || item.Floor;
          case "room":
            return item.location || item.Location;
          default:
            return null;
        }
      })
      .filter((value, index, self) => value && self.indexOf(value) === index)
      .sort();

    return values;
  };

  // Get contextual options for each dropdown
  const regions = getUniqueValues("region");
  const rtoms = getUniqueValues("rtom");
  const stations = getUniqueValues("station");
  const buildings = getUniqueValues("building");
  const floors = getUniqueValues("floor");
  const rooms = getUniqueValues("room");

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Build URL path from selected filters
  const buildLocationPath = () => {
    const pathParts = [];

    // Add selected values in order: region/rtom/station/building/floor/room
    if (filters.region) pathParts.push(encodeURIComponent(filters.region));
    if (filters.rtom) pathParts.push(encodeURIComponent(filters.rtom));
    if (filters.station) pathParts.push(encodeURIComponent(filters.station));
    if (filters.building) pathParts.push(encodeURIComponent(filters.building));
    if (filters.floor) pathParts.push(encodeURIComponent(filters.floor));
    if (filters.room) pathParts.push(encodeURIComponent(filters.room));

    return pathParts.length > 0 ? pathParts.join("/") : "";
  };

  // Handle search
  const handleSearch = async () => {
    const locationPath = buildLocationPath();

    if (!locationPath) {
      alert("Please select at least one location filter");
      return;
    }

    setLoading(true);

    try {
      // Navigate to location page with the constructed path
      navigate(`/${locationPath}`, {
        state: {
          filters: filters,
          locationPath: locationPath,
        },
      });
    } catch (error) {
      console.error("Search error:", error);
      alert("Error searching for assets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm bg-white p-5">
      <h2 className="sm:text-lg font-semibold mb-4">Search by Location</h2>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {dataLoading ? (
        <Loader message="Loading location data..." />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Region Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.region}
                onChange={(e) => handleFilterChange("region", e.target.value)}
              >
                <option value="">Eg: HQ</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* RTOM Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                RTOM
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.rtom}
                onChange={(e) => handleFilterChange("rtom", e.target.value)}
              >
                <option value="">Eg: HQ</option>
                {rtoms.map((rtom) => (
                  <option key={rtom} value={rtom}>
                    {rtom}
                  </option>
                ))}
              </select>
            </div>

            {/* Station Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Station
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.station}
                onChange={(e) => handleFilterChange("station", e.target.value)}
              >
                <option value="">Eg: HQ</option>
                {stations.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
            </div>

            {/* Building Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Building
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.building}
                onChange={(e) => handleFilterChange("building", e.target.value)}
              >
                <option value="">Eg: Building A</option>
                {buildings.map((building) => (
                  <option key={building} value={building}>
                    {building}
                  </option>
                ))}
              </select>
            </div>

            {/* Floor Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floor
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.floor}
                onChange={(e) => handleFilterChange("floor", e.target.value)}
              >
                <option value="">Eg: 1</option>
                {floors.map((floor) => (
                  <option key={floor} value={floor}>
                    {floor}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.room}
                onChange={(e) => handleFilterChange("room", e.target.value)}
              >
                <option value="">Eg: C Union</option>
                {rooms.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex gap-2 justify-center items-center w-full sm:w-auto bg-[#050E3C] text-white py-2 px-6 rounded-lg hover:bg-[#050E3C]/90 transition-all text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ffffff"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
              {loading ? "Searching..." : "Search Location"}
            </button>
          </div>

          {/* Display current path */}
          {buildLocationPath() && (
            <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
              <strong>Current Path:</strong> {buildLocationPath()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchLocation;
