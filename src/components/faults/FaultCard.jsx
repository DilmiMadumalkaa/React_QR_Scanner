import React from "react";
import { useNavigate } from "react-router-dom";

// Define color codes for status
const statusColors = {
  PENDING: { bg: "bg-red-600", text: "text-white", border: "border-red-600" },
  IN_PROGRESS: { bg: "bg-blue-950", text: "text-white", border: "border-blue-950" },
  RESOLVED: { bg: "bg-green-600", text: "text-white", border: "border-green-600" },
  REJECTED: { bg: "bg-red-600", text: "text-white", border: "border-red-600" },
};

function StatusBadge({ status }) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border";

  const statusStyle = statusColors[status] || { bg: "bg-gray-500", text: "text-white", border: "border-gray-500" };

  return (
    <span className={`${base} ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
      {status}
    </span>
  );
}

const FaultCard = ({ fault }) => {
  const navigate = useNavigate();

  const truncateText = (text, maxLength = 80) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const reportedDate = new Date(fault.reportedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      onClick={() => navigate(`/faults/${fault.id}`)}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Header: Fault ID and Status Badge */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Fault {fault.id}</h3>
        </div>
        <StatusBadge status={fault.status} />
      </div>

      {/* Asset Information Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Asset Type</p>
          <p className="text-sm text-gray-900 font-semibold mt-1">{fault.assetType}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Asset ID</p>
          <p className="text-sm text-gray-900 font-semibold mt-1">{fault.assetId}</p>
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Location</p>
        <p className="text-sm text-gray-900 mt-1">{fault.locationName}</p>
      </div>

      {/* Description (truncated to 80 chars) */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Description</p>
        <p className="text-sm text-gray-700 mt-1 line-clamp-2">
          {truncateText(fault.description)}
        </p>
      </div>

      {/* Date reported */}
      <div className="pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Reported on <span className="text-gray-700 font-semibold">{reportedDate}</span>
        </p>
      </div>
    </div>
  );
};

export default FaultCard;
