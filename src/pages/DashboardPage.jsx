import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/authService";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HomeCard from "../components/HomeCard";
import { getUserFaults } from "../services/faultService";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      <div className="absolute inset-0 bg-gray-50/50"></div>
      
      {/* Navbar */}
      <Navbar logout={logout} user={user} />

      {/* Sidebar */}
      <Sidebar
        user={user}
        logout={logout}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main className="lg:ml-64 p-10 pt-24 relative z-10">
        <header className="text-center mb-[35px]">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="opacity-85 text-[15px]">Your QR Scan Management Panel</p>
        </header>

        {/* Fault Count Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto mb-12">
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

        <style jsx>{`
          @keyframes fadeIn {
            to { opacity: 1; }
          }
        `}</style>
      </main>
    </div>
  );
}