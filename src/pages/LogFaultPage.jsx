import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LogFaultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const asset = location.state?.asset;
  const [images, setImages] = useState([]);
  const [date,setDate]=useState("");

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
    // Handle form submission logic here
    console.log("Fault submitted for asset:", asset);
    alert("Fault reported successfully!");
    navigate("/location");
  };

  return (
    <>
      <div className="relative text-gray-800">
        <div className="max-w-2xl mx-auto px-5">
          <button
            type="button"
            onClick={() => navigate("/location")}
            className="flex flex-row items-center gap-1 text-[#050E3C] mb-2 text-md font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15px"
              viewBox="0 -960 960 960"
              width="15px"
              fill="#050E3C"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
            Back
          </button>

          <h1 className="text-3xl text-center font-bold mb-2">Report Fault</h1>
          {asset && (
            <p className="text-center text-gray-600 mb-6">
              Asset: <span className="font-semibold">{asset.name}</span> (
              {asset.assetId})
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Fault Type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Fault Type <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
              >
                <option value="">Select fault type</option>
                <option>Work</option>
                <option>Fault</option>
                <option>Service</option>
              </select>
            </div>

            {/* Fault Details */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Fault Details <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                placeholder="Briefly Mention the Fault"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none">
                <option value="">Select priority</option>
                <option>Non-Critical</option>
                <option>Moderate</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            {/* Fault Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Fault Details <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe the Fault"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Images (Max 3)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full text-sm mt-2 file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:bg-blue-50 file:text-blue-950
                       hover:file:bg-blue-100"
              />
              {images.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {images.length} image(s) selected
                </p>
              )}
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
              />
            </div>

            {/* Fault Details */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Reporter Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="S.P. Fernando"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
              />
            </div>

            {/* Fault Details */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="0118965241"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4 sm:gap-5">
              <button
                type="button"
                onClick={() => navigate("/location")}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
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
      </div>
    </>
  );
}
