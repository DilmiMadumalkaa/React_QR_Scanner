import React from "react";

const Navbar = ({ logout, user }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#050E3C] px-6 py-4 flex items-center justify-between shadow z-50 border-b-[0.1px] border-white-500">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img
          src="../slt_logo.png"
          alt="Logo"
          className="h-10 w-30"
        />
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
