import React from "react";

export default function HomeCard({title, icon, value, subtitle, iconBg, iconColor}) {
  return (
    <div className="w-full rounded-2xl border border-gray-300 bg-white p-3 shadow-sm hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">
          {title}
        </h3>
        <div className={`text-2xl font-extrabold ${iconColor}`}>{value}</div>
      </div>
    </div>
  );
}
