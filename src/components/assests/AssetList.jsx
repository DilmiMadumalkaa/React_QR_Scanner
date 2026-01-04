import React from "react";
import { useNavigate } from "react-router-dom";

export default function AssetList({
  assets = [],
  onAssetClick,
  basePath ,
}) {
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  const handleReportFault = (e, asset) => {
    e.stopPropagation(); // Prevent card click
    navigate('/logfault', {
      state: { asset },
    });
  };

>>>>>>> origin/Timasha
  const handleClick = (asset) => {
    if (onAssetClick) return onAssetClick(asset);
    navigate(`${basePath}/${asset.id}`);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => (
<<<<<<< HEAD
          <button
            key={asset.id}
            type="button"
            onClick={() => handleClick(asset)}
            className="w-full text-left rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 hover:duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <div className="flex items-start justify-between gap-4">
=======
          <div
            key={asset.id}
            className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 hover:duration-300"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
>>>>>>> origin/Timasha
              <div className="flex items-start gap-4 min-w-0">
                <div className="mt-0.5">
                  <TypeIcon type={asset.type} />
                </div>

                <div className="min-w-0">
<<<<<<< HEAD
                  <p className=" font-semibold text-gray-900">
=======
                  <p className="font-semibold text-gray-900">
>>>>>>> origin/Timasha
                    {asset.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Asset ID:{" "}
                    <span className="font-medium text-gray-700">
                      {asset.assetId}
                    </span>
                  </p>
                </div>
              </div>

              <StatusBadge status={asset.status} />
            </div>
<<<<<<< HEAD
          </button>
=======

            {/* Report Fault Button */}
            <button
              type="button"
              onClick={(e) => handleReportFault(e, asset)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[#050E3C] rounded-md hover:bg-gray-100 transition-all font-medium text-xs active:scale-95"
            >
              Report Fault
            </button>
          </div>
>>>>>>> origin/Timasha
        ))}
      </div>

      {assets.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
          No assets found for this location.
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const base =
    "shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border";

  if (status === "Faulty") {
    return (
      <span className={`${base} bg-red-600 text-white border-red-600`}>
        Faulty
      </span>
    );
  }
  if (status === "In Progress") {
    return (
      <span className={`${base} bg-blue-950 text-white border-blue-950`}>
        In Progress
      </span>
    );
  }
  if (status === "Offline") {
    return (
      <span
        className={`${base} bg-yellow-50 text-yellow-800 border-yellow-200`}
      >
        Offline
      </span>
    );
  }
  // Active / default
  return (
    <span className={`${base} bg-green-600 text-white border-green-600`}>
      Active
    </span>
  );
}

function TypeIcon({ type }) {
  // Keep icons simple & dependency-free (SVG). Add more as needed.
  const common = "h-10 w-10 rounded-xl flex items-center justify-center";
  const label = type?.toLowerCase?.() || "";

  if (label.includes("ac")) {
    return (
      <div className={`${common} bg-blue-50 text-blue-900`} aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 7h16v10H4V7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M7 10h10M7 14h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (label.includes("light")) {
    return (
      <div
        className={`${common} bg-yellow-50 text-yellow-800`}
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2a7 7 0 0 0-4 12c.6.5 1 1.2 1 2v1h6v-1c0-.8.4-1.5 1-2a7 7 0 0 0-4-12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9 22h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (label.includes("fan")) {
    return (
      <div
        className={`${common} bg-emerald-50 text-emerald-800`}
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 4c2 0 3 1 3 3s-1 3-3 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 12c0 2-1 3-3 3s-3-1-3-3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 20c-2 0-3-1-3-3s1-3 3-3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 12c0-2 1-3 3-3s3 1 3 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // Default: generic asset icon
  return (
    <div className={`${common} bg-gray-100 text-gray-700`} aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 7h16v12H4V7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M7 7V5h10v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
