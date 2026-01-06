import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LogFaultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const asset = location.state?.asset;
  const [images, setImages] = useState([]);


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
    navigate('/location');
  };

  return (
    <>
      <div className="min-h-screen bg-white overflow-hidden relative text-gray-800">
        <div className="max-w-lg mx-auto p-6 pt-2">
          <h1 className="text-3xl text-center font-bold mb-2">Report Fault</h1>
          {asset && (
            <p className="text-center text-gray-600 mb-6">
              Asset: <span className="font-semibold">{asset.name}</span> ({asset.assetId})
            </p>
          )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Fault Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Fault Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe the fault..."
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Fault Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Fault Type <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full rounded-lg border border-gray-300 p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select fault type</option>
              <option>Electrical</option>
              <option>Mechanical</option>
              <option>Performance</option>
              <option>Other</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Priority
            </label>
            <select className="w-full rounded-lg border border-gray-300 p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Select priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
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

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 sm:gap-1">
            <button
              type="button"
              onClick={() => navigate('/location')}
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
