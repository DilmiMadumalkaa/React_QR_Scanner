import React, { useEffect, useState } from "react";
import Navbar from "../components/common/navbar";
import FaultList from "../components/faults/FaultList";
import { useAuth } from '../services/authService';
import { getUserFaults } from '../services/faultService';

const MyComplaintsPage = () => {
  const { user, logout } = useAuth();
  const [faults, setFaults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaults = async () => {
      if (!user?.uid) return;
      setLoading(true);
      try {
        let data = await getUserFaults(user.uid);

        // ✅ Ensure the third fault is COMPLETED (for testing/green color)
        if (data.length >= 3) {
          data[2].status = "COMPLETED";
        }

        setFaults(data);
      } catch (err) {
        console.error("Failed to load user faults", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaults();
  }, [user?.uid]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white relative text-gray-800">
      <Navbar logout={logout} user={user} />

      <main className="relative z-10 mx-2 pt-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-950 mb-2">
            My Complaints
          </h1>
          <p className="text-gray-600 text-lg">
            Track and manage all your reported faults
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-950 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading complaints...</p>
          </div>
        ) : faults.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="text-7xl mb-4 animate-bounce">📋</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">No Complaints Yet</h2>
            <p className="text-gray-500 text-center max-w-md">
              You haven't reported any faults or issues. Once you report, all complaints will appear here.
            </p>
          </div>
        ) : (
          <FaultList faults={faults} />
        )}
      </main>
    </div>
  );
};

export default MyComplaintsPage;
