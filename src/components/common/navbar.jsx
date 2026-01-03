import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#050E3C] shadow z-50 border-b-[0.1px] border-white/5 transition-all duration-600">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* User Details Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-lg font-bold text-white">
            {user?.displayName?.charAt(0) || "U"}
          </div>
          <div className="text-white hidden sm:block">
            <p className="font-semibold text-sm">{user?.displayName}</p>
            <p className="text-xs opacity-70">{user?.email}</p>
          </div>
        </div>

        {/* Navigation Links - Centered */}
        <div className="flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => navigate("/")}
            className={`px-4 py-2 rounded-lg transition-all text-white font-medium ${
              location.pathname === "/"
                ? "bg-white/5"
                : "hover:text-white/50"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/mycomplaints")}
            className={`px-4 py-2 rounded-lg transition-all text-white font-medium ${
              location.pathname === "/mycomplaints"
                ? "bg-white/5"
                : "hover:text-white/50"
            }`}
          >
            My Complaints
          </button>
        </div>

        {/* Logout Button - Right Corner */}
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg transition-all text-white font-medium hover:text-white/50 flex items-center gap-2"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
