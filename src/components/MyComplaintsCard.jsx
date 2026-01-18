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
    <div className="flex items-center justify-between gap-4 p-1.5 border-b border-gray-100">
      <div className="min-w-0">
        <h4 className="truncate text-sm font-semibold text-gray-900">
          {title}
        </h4>
        <p className="mt-0.5 text-xs text-gray-500">{location}</p>
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
    {
      title: "AC Not Working",
      location: "Office 205",
      date: "2024-12-19",
      status: "Completed",
    },
    {
      title: "Power Outage - Block C",
      location: "Main Hall",
      date: "2024-12-21",
      status: "In Progress",
    }
  ],
}) {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-gray-900">My Complaints</h3>
      </div>

      <div className="mt-3 space-y-1 max-h-[220px] overflow-y-auto pr-10">
        {items.map((c, idx) => (
          <ComplaintItem key={idx} {...c} />
        ))}
      </div>
    </div>
  );
}
