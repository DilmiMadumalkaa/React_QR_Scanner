import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#050E3C] shadow z-50 border-b-[0.1px] border-white/5 transition-all duration-600">
      <div className="px-6 py-4 flex items-center justify-between relative">

        {/* User Details Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-lg font-bold text-white">
            {user?.displayName?.charAt(0) || "U"}
          </div>
          <div className="text-white hidden sm:block lg:block">
            <p className="font-semibold text-sm">{user?.displayName}</p>
            <p className="text-xs opacity-70">{user?.email}</p>
          </div>
        </div>

        {/* Navigation Links - Centered - Hidden on mobile/tablet */}
        <div className="hidden lg:flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
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

        {/* Logout Button - Right Corner - Hidden on mobile/tablet */}
        <button
          onClick={logout}
          className="hidden lg:flex px-4 py-2 rounded-lg transition-all text-white font-medium hover:text-white/50 items-center gap-2"
        >
          Logout
        </button>

        {/* Mobile/Tablet Menu Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile/Tablet Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border border-gray-200 absolute right-0 top-[75px] w-48 rounded-sm shadow-sm overflow-hidden z-50">
          <div className="flex flex-col">
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className={`px-4 py-3 transition-all text-gray-700 font-medium text-left ${
                location.pathname === "/"
                  ? "bg-gray-100"
                  : "hover:bg-gray-50"
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => {
                navigate("/mycomplaints");
                setIsMenuOpen(false);
              }}
              className={`px-4 py-3 transition-all text-gray-700 font-medium text-left ${
                location.pathname === "/mycomplaints"
                  ? "bg-gray-100"
                  : "hover:bg-gray-50"
              }`}
            >
              My Complaints
            </button>

            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="px-4 py-3 transition-all text-gray-700 font-medium hover:bg-gray-50 text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
