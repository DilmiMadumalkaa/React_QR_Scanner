import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ logout, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#050E3C] px-6 py-4 flex items-center shadow z-50 border-b-[0.1px] border-white/5">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img
          src="../slt_logo.png"
          alt="Logo"
          className="h-10 w-30"
        />
      </div>

      {/* Navigation Links - Centered */}
      <div className="flex items-center gap-4 mx-auto">
        <button
          onClick={() => navigate("/")}
          className={`px-4 py-2 rounded-lg transition-all text-white font-medium ${
            location.pathname === "/" 
              ? "bg-white/20" 
              : "hover:bg-white/10"
          }`}
        >
          Dashboard
        </button>
        
        <button
          onClick={() => navigate("/mycomplaints")}
          className={`px-4 py-2 rounded-lg transition-all text-white font-medium ${
            location.pathname === "/mycomplaints" 
              ? "bg-white/20" 
              : "hover:bg-white/10"
          }`}
        >
          My Complaints
        </button>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg transition-all text-white font-medium hover:bg-red-500/20 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </div>

      {/* User Details */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-lg font-bold text-white">
          {user?.displayName?.charAt(0) || 'U'}
        </div>
        <div className="text-white">
          <p className="font-semibold text-sm">{user?.displayName}</p>
          <p className="text-xs opacity-70">{user?.email}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
