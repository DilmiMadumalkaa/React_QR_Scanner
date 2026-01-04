import React from "react";
import { useAuth } from "../services/authService";
import Navbar from "./common/navbar";

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white overflow-hidden relative text-gray-800">
      <div className="absolute inset-0 bg-gray-50/50"></div>

      {/* Fixed Navbar */}
      <Navbar user={user} logout={logout} />

      {/* Main Content Area */}
      <main className="pt-24 relative z-10 mx-5">
        {children}
      </main>
    </div>
  );
}
