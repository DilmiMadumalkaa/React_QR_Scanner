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

  useEffect(() => {
    const fetchFault = async () => {
      try {
        let data = await getFaultById(faultId);

        // ✅ Force third fault to COMPLETED for testing (green)
        // You can replace this with a real check for completed faults
        if (data && Number(faultId) === 3) {
          data.status = "COMPLETED";
        }

        // Ensure status matches statusColors keys
        if (data && data.status) {
          data.status = data.status.toUpperCase();
        }

        setFault(data);
      } catch (error) {
        console.error("Error fetching fault details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFault();
  }, [faultId]);

  if (loading)
    return (
      <div className="min-h-screen bg-white relative text-gray-800">
        <div className="absolute inset-0 bg-gray-50/50"></div>
        <Navbar logout={logout} user={user} />
        <div className="pt-32 px-6 flex items-center justify-center min-h-[calc(100vh-96px)]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading fault details...</p>
          </div>
        </div>
      </div>
    );

  if (!fault)
    return (
      <div className="min-h-screen bg-white relative text-gray-800">
        <div className="absolute inset-0 bg-gray-50/50"></div>
        <Navbar logout={logout} user={user} />
        <div className="pt-32 px-6 flex items-center justify-center min-h-[calc(100vh-96px)]">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm text-center max-w-md">
            <p className="text-gray-900 text-lg font-semibold">Fault not found</p>
            <p className="text-gray-500 mt-2">The fault details could not be retrieved.</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white relative text-gray-800">
      <div className="absolute inset-0 bg-gray-50/50"></div>

      <Navbar logout={logout} user={user} />
      <main className="relative z-10 pt-4 px-6 pb-16 max-w-5xl mx-auto">
        <header className="text-center mb-[35px]">
          <h1 className="text-4xl font-bold">Complaint Details</h1>
          <p className="opacity-85 text-[15px] mt-3">
            View complete information about your reported fault
          </p>
        </header>

        <FaultDetails fault={fault} />
      </main>
    </div>
  );
};

export default FaultDetailsPage;