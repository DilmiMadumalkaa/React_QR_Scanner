import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/authService";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
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
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="opacity-85 text-[15px]">Your QR Scan Management Panel</p>
        </header>

        <style jsx>{`
          @keyframes fadeIn {
            to { opacity: 1; }
          }
        `}</style>
      </main>
    </div>
  );
}