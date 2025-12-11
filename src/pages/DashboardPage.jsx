import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";
import { useAuth } from "../services/authService";
import Navbar from "../components/navbar";



export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container bg-blue-800">
      <Navbar logout={logout}/>
      <header className="dashboard-header mt-20">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Your QR Scan Management Panel</p>
      </header>

      <div className="dashboard-card fade-in">
        <div className="user-info">
          <h2>Welcome ✨</h2>
          <p className="user-name">{user?.displayName}</p>
          <p className="user-email">{user?.email}</p>
        </div>

        <div className="dashboard-actions">
          <button onClick={() => navigate("/scan")} className="btn scan-btn">
            <span className="flex items-center gap-2">
                <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M520-120v-80h80v80h-80Zm-80-80v-200h80v200h-80Zm320-120v-160h80v160h-80Zm-80-160v-80h80v80h-80Zm-480 80v-80h80v80h-80Zm-80-80v-80h80v80h-80Zm360-280v-80h80v80h-80ZM180-660h120v-120H180v120Zm-60 60v-240h240v240H120Zm60 420h120v-120H180v120Zm-60 60v-240h240v240H120Zm540-540h120v-120H660v120Zm-60 60v-240h240v240H600Zm80 480v-120h-80v-80h160v120h80v80H680ZM520-400v-80h160v80H520Zm-160 0v-80h-80v-80h240v80h-80v80h-80Zm40-200v-160h80v80h80v80H400Zm-190-90v-60h60v60h-60Zm0 480v-60h60v60h-60Zm480-480v-60h60v60h-60Z"/></svg>
                Scan QR Code
            </span>
         </button>
        </div>
      </div>

      <div className="history-section fade-in-delayed">
        <h3 className="section-title">📄 Scan History</h3>
        <p className="section-subtitle">
          Your scanned QR entries will appear here once saved in the backend.
        </p>

        <div className="history-placeholder">
          <p>No scans yet…</p>
        </div>
      </div>
    </div>
  );
}
