import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/authService";
import Navbar from "../components/common/navbar";
import HomeCard from "../components/HomeCard";
import MyComplaintsCard from "../components/MyComplaintsCard";
import SearchLocation from "../components/SearchLocation";
import { getUserFaults } from "../services/faultService";

export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [faults, setFaults] = useState([]);
  const [faultCounts, setFaultCounts] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });

  useEffect(() => {
    const fetchAndCountFaults = async () => {
      try {
        const data = await getUserFaults(user?.uid);
        setFaults(data || []);
        
        // Calculate counts by status
        const counts = {
          total: data?.length || 0,
          pending: data?.filter(f => f.status === "PENDING").length || 0,
          inProgress: data?.filter(f => f.status === "IN_PROGRESS").length || 0,
          completed: data?.filter(f => f.status === "COMPLETED").length || 0
        };
        setFaultCounts(counts);
      } catch (error) {
        console.error("Error fetching faults:", error);
      }
    };
    
    fetchAndCountFaults();
  }, [user?.uid]);

  return (
    <div className="min-h-screen bg-white overflow-hidden relative text-gray-800">
      {/* Navbar */}
      <Navbar logout={logout} user={user} />

      {/* Main Content */}
      <main className="justify-center relative sm:mx-10">
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

        <div className="sm:mx-10 mx-3 mt-5 space-y-5 lg:block">
          {/* Fault Status Cards */}
          <div className="sm:mx-24  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <HomeCard
              title="Total Faults"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="22px"
                  viewBox="0 -960 960 960"
                  width="22px"
                  fill="#3B82F6"
                >
                  <path d="M440-400v-360h80v360h-80Zm0 200v-80h80v80h-80Z" />
                </svg>
              }
              value={faultCounts.total}
              iconBg="bg-blue-50"
              textColor="text-blue-600"
            />
            <HomeCard
              title="Pending"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#DC2626"
                >
                  <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm-40-320h80v-160h-80v160Zm0-240h80v-80h-80v80Z" />
                </svg>
              }
              value={faultCounts.pending}
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
              value={faultCounts.inProgress}
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
              value={faultCounts.completed}
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

            {/* Search by Location */}
            <SearchLocation />
          </div>

          {/* My Complaints */}
          <div className="sm:px-10">
            <MyComplaintsCard />
          </div>
        </div>
      </main>
    </div>
  );

}
