// MyComplaintsCard.jsx
import React from "react";

function StatusBadge({ status }) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border";

  if (status === "Pending") {
    return (
      <span className={`${base} bg-red-600 text-white border-red-600`}>
        Pending
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

  // Completed
  return (
    <span className={`${base} bg-green-600 text-white border-green-600`}>
      Completed
    </span>
  );
}

function ComplaintItem({ title, location, status }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="min-w-0">
        <h4 className="truncate text-base font-semibold text-gray-900">
          {title}
        </h4>
        <p className="mt-1 text-sm text-gray-500">{location}</p>
      </div>

      <div className="shrink-0">
        <StatusBadge status={status} />
      </div>
    </div>
  );
}

export default function MyComplaintsCard({
  items = [
    {
      title: "Water Leakage - Building A",
      location: "Floor 3, Room 301",
      date: "2024-12-20",
      status: "Pending",
    },
    {
      title: "Power Outage - Block C",
      location: "Main Hall",
      date: "2024-12-21",
      status: "In Progress",
    },
    {
      title: "AC Not Working",
      location: "Office 205",
      date: "2024-12-19",
      status: "Completed",
    },
  ],
}) {
  return (
    <div className="w-[520px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-xl font-bold text-gray-900">My Complaints</h3>
        <p className="mt-1 text-sm text-gray-500">
          Track your submitted faults
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((c, idx) => (
          <ComplaintItem key={idx} {...c} />
        ))}
      </div>
    </div>
  );
}
