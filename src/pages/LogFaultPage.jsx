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
=======
  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 3) {
      alert("You can upload a maximum of 3 images.");
      return;
    }

    setImages(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Fault submitted for asset:", asset);
    alert("Fault reported successfully!");
    navigate("/location");
  };

  return (
    <>
      <div className="relative text-gray-800">
        <div className="max-w-lg mx-auto px-2">
          <button
            type="button"
            onClick={() => navigate("/location")}
            className="flex flex-row items-center gap-2 text-[#050E3C] mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15px"
              viewBox="0 -960 960 960"
              width="15px"
              fill="#050E3C"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
            Back
          </button>

          <h1 className="text-3xl text-center font-bold mb-2">Report Fault</h1>
          {asset && (
            <p className="text-center text-gray-600 mb-6">
              Asset: <span className="font-semibold">{asset.name}</span> (
              {asset.assetId})
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Fault Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Fault Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe the fault..."
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
              />
            </div>

            {/* Fault Type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Fault Type <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
              >
                <option value="">Select fault type</option>
                <option>Work</option>
                <option>Fault</option>
                <option>Service</option>
                <option>Other</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none">
                <option value="">Select priority</option>
                <option>Non-Critical</option>
                <option>Moderate</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Images (Max 3)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full text-sm mt-2 file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:bg-blue-50 file:text-blue-950
                       hover:file:bg-blue-100"
              />
              {images.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {images.length} image(s) selected
                </p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4 sm:gap-3">
              <button
                type="button"
                onClick={() => navigate("/location")}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#050E3C] text-white py-3 rounded-lg font-medium
                       hover:bg-[#050E3C]/90 transition-all active:scale-95"
              >
                Submit Fault
              </button>
            </div>
          </form>
>>>>>>> origin/Vidumini
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
