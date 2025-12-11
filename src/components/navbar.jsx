import React from "react";

const Navbar = ({ logout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-violet-800 px-6 py-4 flex items-center justify-between shadow">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img
          src="../slt_logo.png"
          alt="Logo"
          className="h-10 w-30"
        />
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="text-white border border-white px-4 py-2 rounded-md hover:bg-red-700 hover:border-none transition"
      >
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#ffffff"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
          Sign Out
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
