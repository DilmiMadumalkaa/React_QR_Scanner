//faultdetailspage
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../services/authService";
import Navbar from "../components/common/navbar";
import { getFaultById } from "../services/faultService";
import FaultDetails from "../components/faults/FaultDetails";

const FaultDetailsPage = () => {
  const { faultId } = useParams();
  const { user, logout } = useAuth();
  const [fault, setFault] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFault = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFaultById(faultId);
        
        if (!data) {
          setError("Fault not found");
          setFault(null);
        } else {
          // Ensure status is uppercase
          if (data.status) {
            data.status = data.status.toUpperCase();
          }
          setFault(data);
        }
      } catch (error) {
        console.error("Error fetching fault details:", error);
        setError("Failed to load fault details");
        setFault(null);
      } finally {
        setLoading(false);
      }
    };

    if (faultId) {
      fetchFault();
    }
  }, [faultId]);

  /* Loading State */
  if (loading) {
    return (
      <div className="min-h-screen bg-white relative text-gray-800">
        <div className="absolute inset-0 bg-gray-50/50"></div>
        <Navbar logout={logout} user={user} />

        <div className="pt-28 sm:pt-32 px-4 sm:px-6 flex items-center justify-center min-h-[calc(100vh-96px)]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base">
              Loading fault details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* Error State */
  if (error) {
    return (
      <div className="min-h-screen bg-white relative text-gray-800">
        <div className="absolute inset-0 bg-gray-50/50"></div>
        <Navbar logout={logout} user={user} />

        <div className="pt-28 sm:pt-32 px-4 sm:px-6 flex items-center justify-center min-h-[calc(100vh-96px)]">
          <div className="bg-white rounded-2xl border border-red-200 p-6 sm:p-8 shadow-sm text-center max-w-md">
            <p className="text-red-900 text-base sm:text-lg font-semibold">
              Error
            </p>
            <p className="text-red-700 mt-2 text-sm sm:text-base">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* Not Found State */
  if (!fault) {
    return (
      <div className="min-h-screen bg-white relative text-gray-800">
        <div className="absolute inset-0 bg-gray-50/50"></div>
        <Navbar logout={logout} user={user} />

        <div className="pt-28 sm:pt-32 px-4 sm:px-6 flex items-center justify-center min-h-[calc(100vh-96px)]">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm text-center max-w-md">
            <p className="text-gray-900 text-base sm:text-lg font-semibold">
              Fault not found
            </p>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              The fault details could not be retrieved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* Main Page */
  return (
    <div className="min-h-screen bg-white relative text-gray-800">
      <div className="absolute inset-0 bg-gray-50/50"></div>

      <Navbar logout={logout} user={user} />

      <main className="relative z-10 pt-6 sm:pt-8 px-4 sm:px-6 md:px-10 lg:px-0 pb-16 max-w-5xl mx-auto">
        <header className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Fault Details
          </h1>
          <p className="opacity-85 text-sm sm:text-base mt-2 sm:mt-3">
            View complete information about your reported fault
          </p>
        </header>

        <FaultDetails fault={fault} />
      </main>
    </div>
  );
};

export default FaultDetailsPage;
