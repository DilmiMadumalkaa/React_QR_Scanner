import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../services/authService';

const Navbar = ({ logout, user }) => {
  const navigate = useNavigate();
  const { user: authUser, logout: authLogout } = useAuth();
  const displayUser = user || authUser;
  const doLogout = logout || authLogout;

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#050E3C] px-6 py-4 flex items-center justify-between shadow z-50 border-b-[0.1px] border-white/5">

      {/* Left - Logo */}
      <div className="flex items-center gap-3">
        <img
          src="../slt_logo.png"
          alt="Logo"
          className="h-10 w-30 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Right Side - Button + User Info */}
      <div className="flex items-center gap-10">

        {/* My Complaints Button */}
        <button
          onClick={() => navigate("/my-complaints")}
          className="text-white text-sm font-medium hover:text-emerald-400 transition"
        >
          My Complaints
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-lg font-bold text-white">
            {displayUser?.displayName?.charAt(0) || "U"}
          </div>
          <div className="text-white">
            <p className="font-semibold text-sm">{displayUser?.displayName}</p>
            <p className="text-xs opacity-70">{displayUser?.email}</p>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
