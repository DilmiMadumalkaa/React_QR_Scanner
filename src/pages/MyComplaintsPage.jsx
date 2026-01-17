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
    <div className="min-h-screen bg-gradient-to-b from-gray-0 to-white text-gray-800">
      <Navbar logout={logout} user={user} />

      {/* Main Content Wrapper */}
      <main className="relative z-10 px-3 sm:px-6 md:px-10 lg:px-16 pt-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            My Complaints
          </h1>
          <p className="opacity-85 text-sm sm:text-base mt-2 sm:mt-3">
            Track and manage all your reported faults
          </p>
        </header>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 border-t-4 border-b-4 border-blue-950 mb-4"></div>
            <p className="text-gray-600 text-base sm:text-lg">
              Loading complaints...
            </p>
          </div>
        ) : faults.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-14 sm:py-20 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg text-center">
            <div className="text-5xl sm:text-7xl mb-4 animate-bounce">📋</div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              No Complaints Yet
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-md">
              You haven't reported any faults or issues. Once you report, all complaints will appear here.
            </p>
          </div>
        ) : (
          /* Fault List */
          <div className="mt-4">
            <FaultList faults={faults} />
          </div>
        )}
      </main>
    </div>
  );
};

export default MyComplaintsPage;
