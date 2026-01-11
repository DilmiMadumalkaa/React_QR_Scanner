import React from "react";
import { useNavigate } from "react-router-dom";

const statusColors = {
  PENDING: { bg: "bg-red-600", text: "text-white", border: "border-red-600" },
  IN_PROGRESS: { bg: "bg-blue-950", text: "text-white", border: "border-blue-950" },
  RESOLVED: { bg: "bg-green-600", text: "text-white", border: "border-green-600" },
  REJECTED: { bg: "bg-red-600", text: "text-white", border: "border-red-600" },
};

const FaultDetails = ({ fault }) => {
  const navigate = useNavigate();

  if (!fault) return null;

  const statusStyle = statusColors[fault.status] || { bg: "bg-gray-500", text: "text-white", border: "border-gray-500" };
  const reportedDate = new Date(fault.reportedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/mycomplaints")}
        className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-6 flex items-center gap-2"
      >
        ← Back to Complaints
      </button>

      {/* Main Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
        {/* Header with ID and Status */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fault m{fault.id}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Reported on {reportedDate}
            </p>
          </div>
          <span
            className={`text-sm font-bold px-4 py-2 rounded-full ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}
          >
            {fault.status}
          </span>
        </div>

        {/* Asset Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Asset Type</p>
            <p className="text-lg text-gray-900 font-semibold mt-1">{fault.assetType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Asset ID</p>
            <p className="text-lg text-gray-900 font-semibold mt-1">{fault.assetId}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Location</p>
            <p className="text-lg text-gray-900 font-semibold mt-1">{fault.locationName}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Description */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-widest mb-3">
            Complete Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{fault.description}</p>
        </div>
      </div>

      {/* Images Section */}
      {fault.images && fault.images.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Uploaded Images
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {fault.images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt={`Fault ${fault.id} - Image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg border border-gray-200 group-hover:border-blue-400 transition"
                />
                <p className="text-xs text-gray-500 mt-2">Image {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline / Status History */}
      {fault.history && fault.history.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-widest">
            Status Timeline
          </h2>
          <div className="space-y-4">
            {fault.history.map((h, index) => {
              const hStatusStyle = statusColors[h.status] || { bg: "bg-gray-500", text: "text-white", border: "border-gray-500" };
              const historyDate = new Date(h.date).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0"
                >
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${hStatusStyle.bg} border-2 border-gray-200`}
                    ></div>
                    {index < fault.history.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                    )}
                  </div>

                  {/* Timeline Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${hStatusStyle.bg} ${hStatusStyle.text} ${hStatusStyle.border} border`}
                      >
                        {h.status}
                      </span>
                      <p className="text-sm text-gray-500">{historyDate}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Technician Comments */}
      {fault.technicianComment && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Technician Comments
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">{fault.technicianComment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaultDetails;
