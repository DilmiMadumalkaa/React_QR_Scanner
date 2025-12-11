import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";
import { useAuth } from "../services/authService";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
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
            📷 Scan QR
          </button>

          <button onClick={logout} className="btn logout-btn">
            🚪 Sign Out
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
