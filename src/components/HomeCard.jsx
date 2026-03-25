import React from "react";

export default function HomeCard({
  title,
  icon,
  value,
  iconBg,
  textColor,
}) {
  return (
    <div className="w-full rounded-2xl border border-gray-300 bg-white px-10 py-5 shadow-sm hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          {/* ICON */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${iconBg}`}
          >
            {icon}
          </div>

          {/* TITLE */}
          <h3 className="text-md font-semibold text-gray-700">{title}</h3>
        </div>

        {/* VALUE */}
        <div className={`text-3xl font-bold ${textColor}`}>{value}</div>
      </div>
    </div>
  );
}
