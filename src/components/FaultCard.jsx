import React from "react";

export default function FaultCard({title, icon, value, subtitle, iconBg, iconColor}) {
  return (
    <div className="w-[170px] rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-semibold text-gray-700 leading-snug">
          {title.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h3>

        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${iconBg}`}
        >
          <span className={`text-sm font-bold ${iconColor}`}>{icon}</span>
        </span>
      </div>

      <div className="mt-6">
        <div className="text-4xl font-extrabold text-gray-900">{value}</div>
        <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
