import React from "react";
import { useNavigate } from "react-router-dom";

const statusColors = {
  PENDING: { bg: "bg-red-600", text: "text-white", border: "border-red-600", icon: "⚠️" },
  IN_PROGRESS: { bg: "bg-blue-950", text: "text-white", border: "border-blue-950", icon: "⏱" },
  COMPLETED: { bg: "bg-green-600", text: "text-white", border: "border-green-600", icon: "✅" },
  REJECTED: { bg: "bg-red-600", text: "text-white", border: "border-red-600", icon: "❌" },
};

const FaultDetails = ({ fault }) => {
  const navigate = useNavigate();
  if (!fault) return null;

  const statusStyle = statusColors[fault.status.toUpperCase()] || statusColors.PENDING;
  const reportedDate = new Date(fault.reportedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/mycomplaints")}
        className="text-blue-950 hover:text-blue-700 font-semibold text-sm mb-4 flex items-center gap-2"
      >
        ← Back to Complaints
      </button>

      {/* Main Card */}
      <div className={`border-l-4 ${statusStyle.border} bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all`}>
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{statusStyle.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fault {fault.id}</h1>
              <p className="text-gray-500 text-sm mt-1">Reported on {reportedDate}</p>
            </div>
          </div>
          <span
            className={`text-sm font-bold px-4 py-2 rounded-full ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}
          >
            {fault.status.replace("_"," ")}
          </span>
        </div>

        {/* Asset Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-gray-800">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-gray-500">Asset Type</p>
            <p className="text-lg font-semibold mt-1">{fault.assetType}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-gray-500">Asset ID</p>
            <p className="text-lg font-semibold mt-1">{fault.assetId}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-widest font-semibold text-gray-500">Location</p>
            <p className="text-lg font-semibold mt-1">{fault.locationName}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-widest mb-3">Complete Description</h2>
          <p className="text-gray-700 leading-relaxed">{fault.description}</p>
        </div>
      </div>

      {/* Images */}
      {fault.images && fault.images.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md space-y-4">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest">Uploaded Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {fault.images.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg shadow hover:shadow-lg transition cursor-pointer group">
                <img
                  src={img}
                  alt={`Fault ${fault.id} Image ${idx+1}`}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <p className="text-xs text-gray-500 mt-1 text-center">Image {idx+1}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      {fault.history && fault.history.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md space-y-4">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">Status Timeline</h2>
          <div className="space-y-4">
            {fault.history.map((h, idx) => {
              let statusKey = h.status.toUpperCase();
              // ✅ Change COMPLETED to RESOLVED for timeline display
              if (statusKey === "RESOLVED") statusKey = "COMPLETED";

              const hStatus = statusColors[statusKey] || statusColors.PENDING;

              const historyDate = new Date(h.date).toLocaleString("en-US", {
                year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit"
              });

              return (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${hStatus.bg} border-2 border-gray-200`}
                    ></div>
                    {idx < fault.history.length - 1 && (
                      <div className="w-0.5 h-10 bg-gray-200 mt-1"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${hStatus.bg} ${hStatus.text} border ${hStatus.border}`}
                      >
                        {statusKey.replace("_"," ")} {/* ✅ Show RESOLVED instead of COMPLETED */}
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
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-widest">Technician Comments</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700">{fault.technicianComment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaultDetails;
