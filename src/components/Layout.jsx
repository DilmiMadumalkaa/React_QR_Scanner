import React, { useState } from "react";
import { useAuth } from "../services/authService";
import Navbar from "./common/navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white overflow-hidden relative text-gray-800">
      <div className="absolute inset-0 bg-gray-50/50"></div>

      {/* Fixed Navbar */}
      <Navbar user={user} />

      {/* Fixed Sidebar */}
      <Sidebar
        user={user}
        logout={logout}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area - Only this changes */}
      <main className="pt-24 relative z-10 mx-5 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
