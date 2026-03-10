//mycomplaintpage
import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../components/common/navbar";
import FaultList from "../components/faults/FaultList";
import { useAuth } from '../services/authService';
import { getUserFaults } from '../services/faultService';

const MyComplaintsPage = () => {
  const { user, logout } = useAuth();
  const [faults, setFaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter faults based on search query
  const filteredFaults = useMemo(() => {
    if (!searchQuery.trim()) return faults;

    const query = searchQuery.toLowerCase();
    return faults.filter((fault) => {
      const searchableFields = [
        fault.assetType,
        fault.assetId,
        fault.locationName,
        fault.description,
        fault.priority,
        fault.faultType,
        fault.brand,
        fault.model,
        fault.contactNumber,
      ];

      return searchableFields.some(
        (field) => field && field.toString().toLowerCase().includes(query)
      );
    });
  }, [faults, searchQuery]);

  useEffect(() => {
    const fetchFaults = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserFaults(user?.uid);
        setFaults(data || []);
      } catch (err) {
        console.error("Failed to load complaints:", err);
        setError("Failed to load complaints. Please try again later.");
        setFaults([]);
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

        {/* Search Bar */}
        {!loading && faults.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search complaints by asset type, location, description, priority, brand, model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 pr-12 rounded-xl border-2 border-gray-300 focus:border-blue-950 focus:outline-none transition-all text-sm sm:text-base shadow-sm hover:border-gray-400"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-2">
                Found <span className="font-semibold text-gray-700">{filteredFaults.length}</span> complaint{filteredFaults.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 border-t-4 border-b-4 border-blue-950 mb-4"></div>
            <p className="text-gray-600 text-base sm:text-lg">
              Loading complaints...
            </p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="flex flex-col items-center justify-center py-14 sm:py-20 rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8 shadow-lg text-center">
            <div className="text-5xl sm:text-7xl mb-4">⚠️</div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-900 mb-2">
              Error Loading Complaints
            </h2>
            <p className="text-red-700 text-sm sm:text-base max-w-md">
              {error}
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
        ) : filteredFaults.length === 0 ? (
          /* No Search Results */
          <div className="flex flex-col items-center justify-center py-14 sm:py-20 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg text-center">
            <div className="text-5xl sm:text-7xl mb-4">🔍</div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              No Matches Found
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-md">
              No complaints match your search "<span className="font-semibold">{searchQuery}</span>". Try a different search term.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors text-sm font-semibold"
            >
              Clear Search
            </button>
          </div>
        ) : (
          /* Fault List */
          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-4">
              Showing <span className="font-semibold">{filteredFaults.length}</span> complaint{filteredFaults.length !== 1 ? 's' : ''} {searchQuery && `matching "${searchQuery}"`}
            </div>
            <FaultList faults={filteredFaults} />
          </div>
        )}
      </main>
    </div>
  );
};

export default MyComplaintsPage;
