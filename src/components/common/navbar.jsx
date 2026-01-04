import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <nav className="fixed top-0 left-0 w-full bg-[#050E3C] shadow z-50 border-b-[0.1px] border-white/5 transition-all duration-600">
      <div className="px-6 py-4 flex items-center justify-between">
<<<<<<< HEAD
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
            className="hidden md:inline-flex items-center  border border-white px-4 py-2 ml-3 text-sm font-medium text-white rounded-lg hover:bg-white hover:text-blue-950 transform duration-300 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
              className="mr-2 justify-items-center justify-center"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
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
              className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-white/80 rounded-lg  text-white hover:bg-white/10 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="currentColor"
                className="relative justify-center"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
              <span>Logout</span>
            </button>
          </ul>
        </div>
      )}
=======
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
>>>>>>> origin/Timasha
    </nav>
  );
};

export default Navbar;
