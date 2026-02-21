import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FaultForm({ asset }) {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [date, setDate] = useState("");
  const [faultType, setFaultType] = useState("Fault");
  const [priority, setPriority] = useState("Moderate");

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 3) {
      alert("You can upload a maximum of 3 images.");
      return;
    }

    setImages(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Fault submitted for asset:", asset);
    alert("Fault reported successfully!");
    navigate("/location");
  };

  // Determine asset type display
  const assetTypeDisplay = asset?.type === "ac" ? "Precision AC Unit" : asset?.type === "light" ? "Light Panel" : "Not Found";
  const assetIdDisplay = asset?.model || "Not Found";

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Asset Type */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Asset Type</label>
          <input
            type="text"
            value={assetTypeDisplay}
            disabled
            className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700 font-medium"
          />
        </div>

        {/* Asset ID */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Asset ID</label>
          <input
            type="text"
            value={assetIdDisplay}
            disabled
            className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700 font-medium"
          />
        </div>

        {/* Fault Type - Button Style */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-3 uppercase">Fault Type</label>
          <div className="grid grid-cols-3 gap-3">
            {["Fault", "Work", "Service"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFaultType(type)}
                className={`py-3 rounded-lg font-semibold transition-all ${
                  faultType === type
                    ? type === "Fault"
                      ? "bg-red-400 text-white"
                      : type === "Work"
                      ? "bg-teal-400 text-white"
                      : "bg-blue-400 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Fault Details */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Fault Details</label>
          <textarea
            required
            rows={2}
            placeholder="Briefly Mention the Fault"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#050E3C] focus:outline-none"
          />
        </div>

        {/* Priority - Button Style */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-3 uppercase">Priority</label>
          <div className="grid grid-cols-3 gap-3">
            {["Critical", "Moderate", "Non-Critical"].map((pri) => (
              <button
                key={pri}
                type="button"
                onClick={() => setPriority(pri)}
                className={`py-3 rounded-lg font-semibold transition-all ${
                  priority === pri
                    ? pri === "Critical"
                      ? "bg-red-400 text-white"
                      : pri === "Moderate"
                      ? "bg-teal-400 text-white"
                      : "bg-blue-400 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {pri}
              </button>
            ))}
          </div>
        </div>

        {/* Fault Description */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Fault Description</label>
          <textarea
            required
            rows={4}
            placeholder="Describe the Fault"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#050E3C] focus:outline-none"
          />
        </div>

        {/* Fault Photo */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-3 uppercase">Fault Photo (Optional)</label>
          <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#050E3C] hover:bg-gray-50 transition">
            <div className="flex flex-col items-center">
              <svg
                className="w-8 h-8 text-gray-600 mb-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
              <span className="text-gray-600 font-medium">Add Photo</span>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {images.length > 0 && (
            <p className="text-xs text-gray-600 mt-2">
              {images.length} image(s) selected
            </p>
          )}
        </div>

        {/* Date and Time */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Fault Occurred Date and Time</label>
          <input
            required
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#050E3C] focus:outline-none"
          />
        </div>

        {/* Reporter Name */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Reporter Name</label>
          <input
            required
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#050E3C] focus:outline-none"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">Contact Number</label>
          <input
            required
            type="text"
            placeholder="Enter your contact number"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#050E3C] focus:outline-none"
          />
        </div>

        {/* Verify Checkbox */}
        <div className="flex items-center gap-2">
          <input type="checkbox" required className="w-4 h-4 rounded" />
          <label className="text-sm font-medium">
            I verify that all information is correct
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-6 sm:gap-5">
          <button
            type="button"
            onClick={() => navigate("/location")}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#050E3C] text-white py-3 rounded-lg font-medium
                       hover:bg-[#050E3C]/90 transition-all active:scale-95"
          >
            Submit Fault
          </button>
        </div>
      </form>
    </div>
  );
}
