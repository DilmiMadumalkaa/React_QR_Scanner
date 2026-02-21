import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/apiService";

export default function AddAssetForm({ assetType, filters }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assetId: "",
    assetType: assetType === 'ac' ? 'AC' : assetType === 'light' ? 'Light Panel' : "",
    assetName: "",
    specifications: "",
    installationDate: "",
    region: filters?.region || "",
    station: filters?.station || "",
    building: filters?.building || "",
    floor: filters?.floor || "",
    room: filters?.room || "",
  });
  const [assetTypes, setAssetTypes] = useState([]);
  const [validationError, setValidationError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch asset types on component mount
  useEffect(() => {
    const fetchAssetTypes = async () => {
      try {
        const response = await api.get("/asset-types");
        setAssetTypes(response.data);
      } catch (error) {
        console.error("Error fetching asset types:", error);
        // Fallback asset types if API fails
        setAssetTypes([
          { id: 1, name: "AC" },
          { id: 2, name: "Light Panel" },
          { id: 3, name: "Fan" },
          { id: 4, name: "Computer" },
          { id: 5, name: "Printer" },
          { id: 6, name: "Other" },
        ]);
      }
    };
    fetchAssetTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "assetId" ? value.toUpperCase() : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear validation error when user starts typing again
    if (name === "assetId" && validationError) {
      setValidationError("");
    }
  };

  const validateAssetId = async () => {
    if (!formData.assetId.trim()) {
      return;
    }

    setIsValidating(true);
    setValidationError("");

    try {
      const response = await api.post("/assets/validate", {
        assetId: formData.assetId,
      });

      if (response.data.exists) {
        setValidationError(
          `Asset ID already exists at ${response.data.location || "another location"}`
        );
      }
    } catch (error) {
      console.error("Error validating asset ID:", error);
      if (error.response?.data?.message) {
        setValidationError(error.response.data.message);
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there's a validation error
    if (validationError) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post("/assets", formData);
      
      // Show success message
      alert("Asset added successfully!");
      
      // Navigate back to location page and refresh to show new asset
      navigate("/location");
    } catch (error) {
      console.error("Error adding asset:", error);
      alert(error.response?.data?.message || "Failed to add asset");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Asset Type - Pre-filled if from Location Page */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Asset Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.assetType}
            disabled={!!assetType}
            className={`w-full rounded-lg border p-3 ${
              assetType 
                ? "border-gray-300 bg-blue-50 text-gray-700 font-semibold" 
                : "border-gray-300"
            }`}
            readOnly={!!assetType}
          />
          {assetType && <p className="text-xs text-blue-600 mt-1">✓ Pre-filled from Location page</p>}
        </div>

        {/* Asset ID */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Asset ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="assetId"
            value={formData.assetId}
            onChange={handleChange}
            onBlur={validateAssetId}
            placeholder="Enter unique Asset ID"
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#050E3C] focus:outline-none uppercase"
          />
          {isValidating && <p className="text-xs text-yellow-600 mt-1">Validating...</p>}
          {validationError && <p className="text-xs text-red-600 mt-1">⚠ {validationError}</p>}
        </div>

        {/* Asset Name */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">
            Asset Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="assetName"
            value={formData.assetName}
            onChange={handleChange}
            placeholder="Enter Asset Name"
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#050E3C] focus:outline-none"
          />
        </div> */}

        {/* Location Information - if from Location Page */}
        {filters && Object.values(filters).some(v => v) && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-900 mb-3">📍 Location Information</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {filters.region && (
                <div>
                  <label className="text-xs font-semibold text-gray-600">Region</label>
                  <p className="text-gray-800 font-medium">{filters.region}</p>
                </div>
              )}
              {filters.station && (
                <div>
                  <label className="text-xs font-semibold text-gray-600">Station</label>
                  <p className="text-gray-800 font-medium">{filters.station}</p>
                </div>
              )}
              {filters.building && (
                <div>
                  <label className="text-xs font-semibold text-gray-600">Building</label>
                  <p className="text-gray-800 font-medium">{filters.building}</p>
                </div>
              )}
              {filters.floor && (
                <div>
                  <label className="text-xs font-semibold text-gray-600">Floor</label>
                  <p className="text-gray-800 font-medium">{filters.floor}</p>
                </div>
              )}
              {filters.room && (
                <div>
                  <label className="text-xs font-semibold text-gray-600">Room</label>
                  <p className="text-gray-800 font-medium">{filters.room}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Specifications */}
        <div>
          <label className="block text-sm font-medium mb-1">Specifications</label>
          <textarea
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            placeholder="Enter technical specifications"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#050E3C] focus:outline-none"
          />
        </div>

        {/* Installation Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Installation Date</label>
          <input
            type="date"
            name="installationDate"
            value={formData.installationDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#050E3C] focus:outline-none"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4 sm:gap-5">
          <button
            type="button"
            onClick={() => navigate("/location")}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !!validationError}
            className="flex-1 bg-[#050E3C] text-white py-3 rounded-lg font-medium
                       hover:bg-[#050E3C]/90 disabled:bg-gray-400 transition-all active:scale-95"
          >
            {isSubmitting ? "Adding..." : "Add Asset"}
          </button>
        </div>
      </form>
    </div>
  );
}
