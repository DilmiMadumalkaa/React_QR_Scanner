import React from "react";
import { useNavigate } from "react-router-dom";

export default function AssetList({ assets, basePath }) {
  const navigate = useNavigate();

  const handleReportFault = (e, asset) => {
    e.stopPropagation(); // Prevent card click
    navigate("/logfault", {
      state: { asset },
    });
  };
  return (
    <div className="w-full">
      <div className="mx-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 justify-items-center">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-200 overflow-hidden cursor-pointer h-full w-full"
            onClick={(e) => handleReportFault(e, asset)}
          >
            {/* Card Content */}
            <div className="p-5 relative">
              {/* Asset Icon & Type */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <TypeIcon type={asset.type} />
              </div>

              {/* Asset Name */}
              <h3 className="text-sm font-bold text-gray-700 truncate mb-2 group-hover:text-blue-900 transition">
                {asset.model || asset.name}
              </h3>
              <div className="flex gap-4 justify-between">
                {/* Serial Number */}
                <p className="flex text-xs text-gray-500 font-mono truncate mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14px"
                    viewBox="0 -960 960 960"
                    width="15px"
                    fill="#666666"
                  >
                    <path d="M443.5-736.5Q467-760 500-760t56.5 23.5Q580-713 580-680t-23.5 56.5Q533-600 500-600t-56.5-23.5Q420-647 420-680t23.5-56.5ZM500 0 320-180l60-80-60-80 60-85v-47q-54-32-87-86.5T260-680q0-100 70-170t170-70q100 0 170 70t70 170q0 67-33 121.5T620-472v352L500 0ZM340-680q0 56 34 98.5t86 56.5v125l-41 58 61 82-55 71 75 75 40-40v-371q52-14 86-56.5t34-98.5q0-66-47-113t-113-47q-66 0-113 47t-47 113Z" />
                  </svg>
                  <span>{asset.assetId}</span>
                </p>

                {/* QR Tag */}
                {asset.qrTag && (
                  <p className="flex gap-1 text-xs text-gray-500 font-mono truncate mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="15px"
                      viewBox="0 -960 960 960"
                      width="15px"
                      fill="#666666"
                    >
                      <path d="M120-520v-320h320v320H120Zm80-80h160v-160H200v160Zm-80 480v-320h320v320H120Zm80-80h160v-160H200v160Zm320-320v-320h320v320H520Zm80-80h160v-160H600v160Zm160 480v-80h80v80h-80ZM520-360v-80h80v80h-80Zm80 80v-80h80v80h-80Zm-80 80v-80h80v80h-80Zm80 80v-80h80v80h-80Zm80-80v-80h80v80h-80Zm0-160v-80h80v80h-80Zm80 80v-80h80v80h-80Z" />
                    </svg>
                    <span>{asset.qrTag}</span>
                  </p>
                )}
              </div>

              {/* Location Info - Compact */}
              <div className="flex space-y-0.5 text-gray-700 text-xs border-t justify-between pt-4">
                <div>
                  {asset.region && (
                    <p className="flex truncate items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="14px"
                        viewBox="0 -960 960 960"
                        width="15px"
                        fill="#383d3a"
                      >
                        <path d="M536.5-503.5Q560-527 560-560t-23.5-56.5Q513-640 480-640t-56.5 23.5Q400-593 400-560t23.5 56.5Q447-480 480-480t56.5-23.5ZM480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                      </svg>
                      <span className="font-semibold">{asset.region}</span>
                    </p>
                  )}
                  {asset.station && (
                    <p className="ml-4 truncate text-gray-500">
                      <span className="text-gray-500">{asset.station}</span>
                    </p>
                  )}
                </div>
                <div>
                  {asset.building && (
                    <p className="flex items-centertruncate text-gray-500 gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="14px"
                        viewBox="0 -960 960 960"
                        width="14px"
                        fill="#666666"
                      >
                        <path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
                      </svg>
                      {asset.building}
                    </p>
                  )}
                  {asset.room && (
                    <p className="ml-4 truncate text-gray-500">{asset.room}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Hover Action Button */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3 rounded-lg">
              <button className="flex items-center gap-1 text-white text-xs font-medium p-5 py-2 bg-blue-950 rounded transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="14px"
                  viewBox="0 -960 960 960"
                  width="14px"
                  fill="#ffffff"
                >
                  <path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
                </svg>
                Report Fault
              </button>
            </div>
          </div>
        ))}
      </div>
      {assets.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
          <p className="mb-4">No assets found for this location.</p>
          <button
            onClick={() => navigate("/logfault")}
            className="inline-flex items-center gap-2 px-4 py-3 bg-blue-950 text-white text-md font-medium rounded-lg hover:bg-blue-900 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#ffffff"
            >
              <path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
            </svg>
            Asset Not Found
          </button>
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
        Fault
      </span>
    );
  }
  if (status === "In Progress") {
    return (
      <span className={`${base} bg-blue-600 text-white border-blue-600`}>
        Service
      </span>
    );
  }

  // Active / default
  return (
    <span className={`${base} bg-green-600 text-white border-green-600`}>
      Work
    </span>
  );
}

function TypeIcon({ type }) {
  const common = "h-10 w-10 rounded-xl flex items-center justify-center";
  const label = type

  if (label.includes("Precision AC")) {
    return (
      <div
        className={`${common} bg-emerald-50 text-emerald-800`}
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="23px"
          viewBox="0 -960 960 960"
          width="23px"
          fill="#276749"
        >
          <path d="M440-80v-166L310-118l-56-56 186-186v-80h-80L174-254l-56-56 128-130H80v-80h166L118-650l56-56 186 186h80v-80L254-786l56-56 130 128v-166h80v166l130-128 56 56-186 186v80h80l186-186 56 56-128 130h166v80H714l128 130-56 56-186-186h-80v80l186 186-56 56-130-128v166h-80Z" />
        </svg>
      </div>
    );
  }

  if (label.includes("Comfort AC")) {
    return (
      <div className={`${common} bg-blue-50 text-blue-900`} aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="25px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="#2c5282"
        >
          <path d="M240-280h480v-120H240v120Zm-80 120q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
        </svg>
      </div>
    );
  }

  if (label.includes("Light")) {
    return (
      <div
        className={`${common} bg-yellow-50 text-yellow-800`}
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="25px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="#854D0E"
        >
          <path d="M423.5-103.5Q400-127 400-160h160q0 33-23.5 56.5T480-80q-33 0-56.5-23.5ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z" />
        </svg>
      </div>
    );
  }

  
}
