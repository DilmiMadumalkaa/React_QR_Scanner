import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ logout, user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // your existing logout logic
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#050E3C] shadow z-50 border-b-[0.1px] border-white/5 transition-all duration-600">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <NavLink to="/login">
            <img src="../slt_logo.png" alt="Logo" className="h-10 w-30" />
          </NavLink>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:block">
          <ul className="flex gap-8 text-slate-300 text-left">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/mycomplaints"
              className={({ isActive }) =>
                `transition ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                }`
              }
            >
              My Complaints
            </NavLink>
          </ul>
        </div>

        {/* Right Side: User Details (Desktop) + Hamburger (Mobile) */}
        <div className="flex items-center gap-3">
          {/* User Details (hide on very small screens) */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-lg font-bold text-white">
              {user?.displayName?.charAt(0) || "U"}
            </div>
            <div className="text-white">
              <p className="font-semibold text-sm">{user?.displayName}</p>
              <p className="text-xs opacity-70">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="hidden md:inline-flex items-center border border-white px-4 py-2 ml-3 text-sm font-medium text-white rounded-lg hover:bg-white hover:text-blue-950 transform duration-300 "
          >
            Logout
          </button>

          {/* Hamburger (Mobile only) */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white/80 hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-2 text-slate-300 text-left">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 transition ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                } hover:bg-white/10`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/mycomplaints"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 transition ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                } hover:bg-white/10`
              }
            >
              My Complaints
            </NavLink>

            {/* User Details (Mobile) */}
            <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-lg font-bold text-white">
                {user?.displayName?.charAt(0) || "U"}
              </div>
              <div className="text-white">
                <p className="font-semibold text-sm">{user?.displayName}</p>
                <p className="text-xs opacity-70">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="mt-3 rounded-lg px-3 py-2 border border-white text-center text-white  hover:bg-white-600 hover:text-blue-950 transition"
            >
              Logout
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
