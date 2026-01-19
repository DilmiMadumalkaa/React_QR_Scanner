//faultcard 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const statusColors = {
  PENDING: {
    bg: "bg-red-600",
    border: "border-red-600",
    text: "text-white",
  },
  IN_PROGRESS: {
    bg: "bg-blue-950",
    border: "border-blue-950",
    text: "text-white",
  },
  COMPLETED: {
    bg: "bg-green-600",
    border: "border-green-600",
    text: "text-white",
  },
  REJECTED: {
    bg: "bg-red-600",
    border: "border-red-600",
    text: "text-white",
  },
};

const FaultCard = ({ fault }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const truncateText = (text, maxLength = 100) =>
    text.length > maxLength && !expanded
      ? text.substring(0, maxLength) + "..."
      : text;

  const reportedDate = new Date(fault.reportedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const status = statusColors[fault.status] || statusColors.PENDING;

  return (
    <div
      onClick={() => navigate(`/faults/${fault.id}`)}
      className={`border-l-2 ${status.border} bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer p-5`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[15px] font-bold text-gray-800">
          Fault {fault.id}
        </h3>

        <span
          className={`px-3 py-1 text-[11px] font-semibold rounded-full ${status.bg} ${status.text}`}
        >
          {fault.status.replace("_", " ")}
        </span>
      </div>

      {/* Asset Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500 uppercase font-semibold text-[11px]">
            Asset Type
          </p>
          <p className="text-gray-800 font-medium">
            {fault.assetType}
          </p>
        </div>

        <div>
          <p className="text-gray-500 uppercase font-semibold text-[11px]">
            Asset ID
          </p>
          <p className="text-gray-800 font-medium">
            {fault.assetId}
          </p>
        </div>

        <div>
          <p className="text-gray-500 uppercase font-semibold text-[11px]">
            Location
          </p>
          <p className="text-gray-800 font-medium">
            {fault.locationName}
          </p>
        </div>

        <div>
          <p className="text-gray-500 uppercase font-semibold text-[11px]">
            Reported
          </p>
          <p className="text-gray-700 font-medium">
            {reportedDate}
          </p>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-gray-600 text-[13px] leading-relaxed">
          {truncateText(fault.description)}
        </p>

        {fault.description.length > 100 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="text-blue-950 font-semibold text-xs mt-2 hover:underline"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FaultCard;
