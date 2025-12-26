import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import History from "./pages/History";
import { AuthProvider, useAuth } from "./services/authService";
import "./index.css";
import LocationPage from "./pages/LocationPage";
import MyComplaintsPage from "./pages/MyComplaintsPage";

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
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/scan"
          element={
            <PrivateRoute>
              <ScanPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/location"
          element={
            <PrivateRoute>
              <LocationPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/mycomplaints"
          element={
            <PrivateRoute>
              <MyComplaintsPage/>
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
