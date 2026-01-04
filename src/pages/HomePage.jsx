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

  return (
    <div className="min-h-screen bg-white overflow-hidden relative text-gray-800">
      <div className="absolute inset-0 bg-gray-50/50"></div>

      {/* Navbar */}
      <Navbar logout={logout} user={user} />

      {/* Sidebar */}
      {/* <Sidebar
        user={user}
        logout={logout}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      /> */}

      {/* Main Content */}
      <main className="pt-24 justify-center relative z-10 mx-5">
        <header className="text-center mb-[35px] mt-5">
          <p className="opacity-85 text-[15px]">Welcome to</p>
          <h1 className="text-4xl font-bold">Location Fault Logger</h1>
          <p className="opacity-85 text-[15px] mt-3">
            Track, report, and monitor location-based issues in real time
          </p>
        </header>

        <div className="flex justify-center">
          <button
            onClick={() => {
              navigate("/scan");
            }}
            className="flex items-center justify-center w-[500px] gap-2 bg-[#050E3C] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#050E3C]/90 transition-all shadow-lg"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 justify-items-center items-center">
          {/* Left: Status cards */}
          <div className="px-4 sm:px-6 lg:px-10 mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 items-center">
              <HomeCard
                title="Total Faults"
                icon="!"
                value={7}
                subtitle="All reported issues"
                iconBg="bg-red-50"
                iconColor="text-red-600"
              />
              <HomeCard
                title="In Progress"
                icon="⏱"
                value={2}
                subtitle="Currently being resolved"
                iconBg="bg-blue-50"
                iconColor="text-blue-950"
              />
              <HomeCard
                title="Completed Faults"
                icon="✓"
                value={2}
                subtitle="Successfully resolved"
                iconBg="bg-green-50"
                iconColor="text-green-600"
              />
            </div>
          </div>

          {/* My Complaints */}
          <div className="px-4 sm:px-6 lg:px-10 w-full">
            <div className="w-full max-w-xl lg:max-w-none mx-auto mt-5">
              <MyComplaintsCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
