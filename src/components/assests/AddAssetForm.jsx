import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/apiService";

export default function AddAssetForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assetId: "",
    assetType: "",
    assetName: "",
    specifications: "",
    installationDate: "",
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
          { id: 2, name: "Light" },
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
      
      // Navigate back to location page
      navigate("/location", { 
        state: { refresh: true, newAsset: response.data } 
      });
    } catch (error) {
      console.error("Error creating asset:", error);
      alert(
        error.response?.data?.message || 
        "Failed to add asset. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Asset ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Asset ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="assetId"
            value={formData.assetId}
            onChange={handleChange}
            onBlur={validateAssetId}
            required
            className={`w-full rounded-lg border ${
              validationError ? "border-red-500" : "border-gray-300"
            } p-3 uppercase font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            placeholder="e.g., AC-205"
          />
          {isValidating && (
            <p className="text-sm text-blue-600 mt-1">Validating...</p>
          )}
          {validationError && (
            <p className="text-sm text-red-600 mt-1">{validationError}</p>
          )}
        </div>

        {/* Asset Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Asset Type <span className="text-red-500">*</span>
          </label>
          <select
            name="assetType"
            value={formData.assetType}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select asset type</option>
            {assetTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Asset Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Asset Name
          </label>
          <input
            type="text"
            name="assetName"
            value={formData.assetName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g., AC Unit - Office 205"
          />
        </div>

        {/* Specifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specifications
          </label>
          <textarea
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter specifications, model number, or other details..."
          />
        </div>

        {/* Installation Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Installation Date
          </label>
          <input
            type="date"
            name="installationDate"
            value={formData.installationDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/location")}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || validationError || isValidating}
            className="flex-1 bg-[#050E3C] text-white py-3 rounded-lg font-medium
                     hover:bg-[#050E3C]/90 transition-all active:scale-95
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding Asset..." : "Add Asset"}
          </button>
        </div>
      </form>
    </div>
  );
}
