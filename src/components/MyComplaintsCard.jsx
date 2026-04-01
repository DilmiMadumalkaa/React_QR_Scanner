import React from "react";
import { useNavigate } from "react-router-dom";

function StatusBadge({ status }) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border";

  if (status === "PENDING") {
    return (
      <span className={`${base} bg-red-600 text-white border-red-600`}>
        Pending
      </span>
    );
  }

  if (status === "IN_PROGRESS") {
    return (
      <span className={`${base} bg-yellow-600 text-white border-yellow-600`}>
        In Progress
      </span>
    );
  }

  // Completed
  return (
    <span className={`${base} bg-green-600 text-white border-green-600`}>
      Completed
    </span>
  );
}

function ComplaintItem({ fault }) {
  return (
    <div className="flex items-center justify-between gap-4 p-1.5 border-b border-gray-100">
      <div className="min-w-0">
        <h4 className="truncate text-sm font-semibold text-gray-900">
          {fault.assetType} - {fault.faultType || "Fault"}
        </h4>
        <p className="mt-0.5 text-xs text-gray-500">{fault.locationName}</p>
      </div>

      <div className="shrink-0">
        <StatusBadge status={fault.status} />
      </div>
    </div>
  );
}

export default function MyComplaintsCard({ faults = [] }) {
  const navigate = useNavigate();
  
  // Display only first 5 faults
  const displayedFaults = faults.slice(0, 5);

  const handleCardClick = () => {
    navigate("/mycomplaints");
  };

  return (
    <div 
      className="w-full rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      <div>
        <h3 className="text-lg font-bold text-gray-900">My Complaints</h3>
      </div>

      <div className="mt-3 space-y-1 max-h-[220px] overflow-y-auto">
        {displayedFaults.length > 0 ? (
          displayedFaults.map((fault, idx) => (
            <ComplaintItem key={idx} fault={fault} />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No complaints yet
          </p>
        )}
      </div>
    </div>
  );
}
