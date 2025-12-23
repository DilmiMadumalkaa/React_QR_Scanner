import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/authService";
import Navbar from "../components/common/navbar";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <p className="opacity-85 text-[15px]">
            Welcome to
          </p>
          <h1 className="text-4xl font-bold">Location Fault Logger</h1>
          
        </header>

        <div className="flex justify-center">
          <button
            onClick={() => {
              navigate("/scan");
            }}
            className="flex items-center  gap-2 bg-[#050E3C] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#050E3C]/90 transition-all shadow-lg"
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

        <style jsx>{`
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        `}</style>
      </main>
    </div>
  );
}
