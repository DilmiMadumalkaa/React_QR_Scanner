// import React, { useEffect, useState } from "react";
// import { getUserFaults } from "../services/faultService";
// import FaultList from "../components/faults/FaultList";
// import { useAuth } from "../services/authService";

// const MyComplaintsPage = () => {
//   const { user } = useAuth();
//   const [faults, setFaults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFaults = async () => {
//       try {
//         const data = await getUserFaults(user.uid); // or correct backend user ID
//         setFaults(data);
//       } catch (error) {
//         console.error("Error fetching faults", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFaults();
//   }, [user.uid]);0

//   if (loading)
//     return <p className="text-white p-6">Loading complaints...</p>;

//   return (
//     <div className="pt-24 px-6">
//       <h1 className="text-2xl font-bold text-white mb-6">My Complaints</h1>
//       <FaultList faults={faults} />
//     </div>
//   );
// };

// export default MyComplaintsPage;

import React, { useEffect, useState } from "react";
import Navbar from "../components/common/navbar";
import FaultList from "../components/faults/FaultList";
import { useAuth } from '../services/authService';
import { getUserFaults } from '../services/faultService';

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
      <span className={`${base} bg-blue-950 text-white border-blue-950`}>
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

function ComplaintItem({ fault, onClick }) {
  const truncateText = (text, maxLength = 80) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const reportedDate = new Date(fault.reportedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div onClick={onClick} className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all border border-gray-200">
      {/* Header: Fault ID and Status Badge */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-900 font-bold text-base">Fault {fault.id}</h3>
        <StatusBadge status={fault.status} />
      </div>

      {/* Asset ID, Type & Location in same row */}
      <div className="mb-4">
        <div className="flex gap-4 text-sm">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Asset ID</p>
            <p className="text-gray-900 font-semibold truncate">{fault.assetId}</p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Type</p>
            <p className="text-gray-900 font-semibold truncate">{fault.assetType}</p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Location</p>
            <p className="text-gray-700 text-sm truncate">{fault.locationName}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Description</p>
        <p className="text-gray-600 text-sm line-clamp-2">{truncateText(fault.description)}</p>
      </div>

      {/* Divider and Date */}
      <div className="border-t border-gray-200 pt-2.5">
        <p className="text-xs text-gray-500">
          Reported on <span className="text-blue-600 font-semibold">{reportedDate}</span>
        </p>
      </div>
    </div>
  );
}

const MyComplaintsPage = () => {
  const { user, logout } = useAuth();
  const [faults, setFaults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaults = async () => {
      if (!user?.uid) return;
      setLoading(true);
      try {
        const data = await getUserFaults(user.uid);
        setFaults(data);
      } catch (err) {
        console.error("Failed to load user faults", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaults();
  }, [user?.uid]);

  const handleComplaintClick = (faultId) => {
    window.location.href = `/faults/${faultId}`;
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden relative text-gray-800">
      <div className="absolute inset-0 bg-gray-50/50"></div>

      {/* Navbar */}
      <Navbar logout={logout} user={user} />

      {/* Main Content */}
      <main className="justify-center relative z-10 mx-5">
        <header className="text-center mb-[35px] mt-5">
          {/* <p className="opacity-85 text-[15px]">My Fault Reports</p> */}
          <h1 className="text-4xl font-bold">My Complaint </h1>
          <p className="opacity-85 text-[15px] mt-3">
            Track and manage all your reported faults and issues
          </p>
        </header>

        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Loading complaints...</p>
              </div>
            ) : faults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="text-6xl mb-4">📋</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Complaints Yet</h2>
                <p className="text-gray-500 text-center">You haven't reported any faults or issues. All issues you report will appear here.</p>
              </div>
            ) : (
              <div className="w-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">My Complaints</h3>
                  <p className="mt-2 text-gray-600">
                    Showing {faults.length} complaint{faults.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {faults.map((fault) => (
                    <ComplaintItem
                      key={fault.id}
                      fault={fault}
                      onClick={() => handleComplaintClick(fault.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyComplaintsPage;

