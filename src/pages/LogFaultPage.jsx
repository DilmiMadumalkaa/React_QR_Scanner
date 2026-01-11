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
        const data = await getFaultById(faultId);
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
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white relative">
        <Navbar logout={logout} user={user} />
        <div className="pt-32 flex items-center justify-center min-h-[calc(100vh-96px)]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-950 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading fault details...</p>
          </div>
        </div>
      </div>
    );

  if (!fault)
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white relative">
        <Navbar logout={logout} user={user} />
        <div className="pt-32 flex items-center justify-center min-h-[calc(100vh-96px)]">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg text-center max-w-md animate-fadeIn">
            <p className="text-gray-900 text-xl font-bold">Fault not found</p>
            <p className="text-gray-500 mt-2">
              The fault details could not be retrieved.
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white relative text-gray-800">
      <Navbar logout={logout} user={user} />
      <main className="relative z-10 pt-28 px-6 pb-16 max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-950 mb-2 animate-fadeIn">
            Complaint Details
          </h1>
          <p className="opacity-85 text-lg text-gray-600 animate-fadeIn delay-100">
            View complete information about your reported fault
          </p>
        </header>

        <FaultDetails fault={fault} />
      </main>
    </div>
  );
};

export default FaultDetailsPage;
