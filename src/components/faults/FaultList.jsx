import React from "react";
import FaultCard from "./FaultCard";

const FaultList = ({ faults }) => {
  if (!faults || faults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400">
        <p className="text-lg">No complaints found</p>
        <p className="text-sm mt-2">You haven’t reported any faults yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {faults.map((fault) => (
        <FaultCard key={fault.id} fault={fault} />
      ))}
    </div>
  );
};

export default FaultList;