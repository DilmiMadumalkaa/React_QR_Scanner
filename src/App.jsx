import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import History from "./pages/History";
import { AuthProvider, useAuth } from "./services/authService";
import Layout from "./components/Layout";
import "./index.css";
import LocationPage from "./pages/LocationPage";
import MyComplaintsPage from "./pages/MyComplaintsPage";
import FaultDetailsPage from "./pages/FaultDetailsPage";
import LogFaultPage from "./pages/LogFaultPage";
import AddAssetPage from "./pages/AddAssetPage";


function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-4">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* All protected routes wrapped in Layout */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/scan" element={<ScanPage />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/location" element={<LocationPage />} />
                  <Route path="/add-asset" element={<AddAssetPage />} />
                  <Route path="/mycomplaints" element={<MyComplaintsPage />} />
                  <Route path="/logfault" element={<LogFaultPage />} />
                  <Route path="/faults/:faultId" element={<FaultDetailsPage />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
