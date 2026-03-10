//faultdetails
import React from "react";
import { useNavigate } from "react-router-dom";

const statusColors = {
  PENDING: { bg: "bg-red-500", text: "text-white" },
  IN_PROGRESS: { bg: "bg-blue-950", text: "text-white" },
  COMPLETED: { bg: "bg-green-500", text: "text-white" },
  REJECTED: { bg: "bg-red-500", text: "text-white" },
};

const DetailRow = ({ label, value }) => (
  <div className="mb-4">
    <p className="text-[13px] font-semibold text-gray-600 mb-1">{label}</p>
    <p className="text-[14px] font-medium text-gray-900">
      {value || <span className="text-gray-400">Not provided</span>}
    </p>
  </div>
);

const FaultDetails = ({ fault }) => {
  const navigate = useNavigate();
  if (!fault) return null;

  const statusStyle = statusColors[fault.status.toUpperCase()] || statusColors.PENDING;

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/mycomplaints")}
        className="text-blue-950 hover:text-blue-900 font-medium text-[14px] mb-6 flex items-center gap-2 transition-colors"
      >
        ← Back to Complaints
      </button>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Complaint {fault.id}
            </h1>
            <p className="opacity-85 text-[15px] text-gray-700">
              Detailed information about your fault registration
            </p>
          </div>
          <span className={`text-sm font-bold px-4 py-2 rounded-lg whitespace-nowrap ${statusStyle.bg} ${statusStyle.text}`}>
            {fault.status.replace("_", " ")}
          </span>
        </div>
      </div>

      {/* Asset Information Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Asset Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DetailRow label="Asset Type" value={fault.assetType} />
          <DetailRow label="Fault ID" value={fault.assetId} />
          <DetailRow label="Brand" value={fault.brand || "N/A"} />
          <DetailRow label="Model" value={fault.model || "N/A"} />
          <DetailRow label="Fault Type" value={fault.faultType || "N/A"} />
          <DetailRow label="Priority" value={fault.priority} />
        </div>
      </div>

      {/* Location Information Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Location Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DetailRow label="Region" value={fault.region || "N/A"} />
          <DetailRow label="Building" value={fault.building || "N/A"} />
          <DetailRow label="Floor" value={fault.floor || "N/A"} />
          <DetailRow label="Room" value={fault.room || "N/A"} />
          <div className="md:col-span-2">
            <DetailRow label="Complete Location" value={fault.locationName} />
          </div>
        </div>
      </div>

      {/* Fault Details Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Fault Details</h2>
        <div>
          <DetailRow label="Fault Detail (Summary)" value={fault.faultDetail || "N/A"} />
          <div className="mt-6">
            <p className="text-[13px] font-semibold text-gray-600 mb-2">Complete Description</p>
            <p className="text-[14px] font-medium text-gray-900 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
              {fault.description || "No description provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Contact & Verification Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Contact & Verification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DetailRow label="Contact Number" value={fault.contactNumber || "N/A"} />
          <DetailRow
            label="Details Verified"
            value={
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-lg ${fault.detailsVerified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {fault.detailsVerified ? "Verified" : "Not Verified"}
              </span>
            }
          />
          <DetailRow label="Fault Status" value={fault.faultStatus || "Pending Review"} />
        </div>
      </div>

      {/* Timeline & Timestamps Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Timeline & Timestamps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DetailRow label="Fault Occurred" value={formatDate(fault.reportedDate)} />
          <DetailRow label="Uploaded On" value={formatDate(fault.uploadedTime)} />
          <DetailRow label="Last Updated By" value={fault.updatedBy || "System"} />
          <DetailRow label="UUID" value={<span className="font-mono text-xs text-gray-600 break-all">{fault.uuid || "N/A"}</span>} />
        </div>
      </div>

      {/* Technician Comments */}
      {fault.technicianComment && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Technician Comments</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-[14px] text-gray-800">{fault.technicianComment}</p>
          </div>
        </div>
      )}

      {/* Images Section */}
      {fault.images && fault.images.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Uploaded Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {fault.images.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
                <img
                  src={img}
                  alt={`Fault ${fault.id} Image ${idx + 1}`}
                  className="w-full h-40 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline History */}
      {fault.history && fault.history.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Status Timeline</h2>
          <div className="space-y-4">
            {fault.history.map((h, idx) => {
              let statusKey = h.status.toUpperCase();
              if (statusKey === "RESOLVED") statusKey = "COMPLETED";

              const hStatus = statusColors[statusKey] || statusColors.PENDING;
              const historyDate = new Date(h.date).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div key={idx} className="flex items-start gap-4 pb-4 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${hStatus.bg} mt-1.5`}></div>
                    {idx < fault.history.length - 1 && <div className="w-0.5 h-10 bg-gray-300 mt-2"></div>}
                  </div>
                  <div className="flex-1">
                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-lg ${hStatus.bg} ${hStatus.text} mb-1`}>
                      {statusKey.replace("_", " ")}
                    </span>
                    <p className="text-[13px] text-gray-600">{historyDate}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FaultDetails;