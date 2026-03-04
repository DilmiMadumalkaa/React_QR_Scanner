import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FaultForm({ asset }) {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [date, setDate] = useState("");
  const [faultType, setFaultType] = useState("Fault");
  const [priority, setPriority] = useState("Moderate");
  const [faultDetails, setFaultDetails] = useState("");
  const [faultDescription, setFaultDescription] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 3) {
      alert("You can upload a maximum of 3 images.");
      return;
    }

    setImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Asset info
      formData.append("assetType", asset?.type);

      // Fault info
      formData.append("faultType", faultType);
      formData.append("faultDetail", faultDetails);
      formData.append("faultDescription", faultDescription);
      formData.append("priority", priority);
      formData.append("faultOccurredDate", date);

      // Reporter info
      formData.append("updatedBy", reporterName);
      formData.append("contactNumber", contactNumber);

      // Images
      images.forEach((image, index) => {
        formData.append("images[]", image);
      });

      const response = await fetch(
        "https://powerprox.sltidc.lk/POSTFaultReg.php/insertFault",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      console.log("API Response:", result);

      if (response.ok) {
        alert("Fault reported successfully!");
        navigate("/mycomplaints");
      } else {
        alert("Failed to submit fault.");
      }
    } catch (error) {
      console.error("Error submitting fault:", error);
      alert("Something went wrong.");
    }
  };

  // Determine asset type display
  const assetTypeDisplay =
    asset?.type === "ac"
      ? "AC"
      : asset?.type === "light"
        ? "Light Panel"
        : asset.type === "pac"
          ? "Precision AC"
          : "Not Found";
  const assetIdDisplay = asset?.id || "Not Found";

  return (
    <div className="py-5 px-2">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Asset Type */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">
            Asset Type
          </label>
          <input
            type="text"
            value={assetTypeDisplay}
            disabled
            className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700 font-medium"
          />
        </div>

        {/* Asset ID */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">
            Asset ID
          </label>
          <input
            type="text"
            value={assetIdDisplay}
            disabled
            className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700 font-medium"
          />
        </div>

        {/* Fault Type - Button Style */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-3 uppercase">
            Fault Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["Fault", "Work", "Service"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFaultType(type)}
                className={`py-3 rounded-lg font-semibold transition-all ${
                  faultType === type
                    ? type === "Fault"
                      ? "bg-red-600 text-white"
                      : type === "Work"
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 text-white"
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
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">
            Fault Details
          </label>
          <textarea
            required
            rows={2}
            value={faultDetails}
            onChange={(e) => setFaultDetails(e.target.value)}
            placeholder="Briefly Mention the Fault"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-gray-300 focus:outline-none"
          />
        </div>

        {/* Priority - Button Style */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-3 uppercase">
            Priority
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["Critical", "Moderate", "Non-Critical"].map((pri) => (
              <button
                key={pri}
                type="button"
                onClick={() => setPriority(pri)}
                className={`py-3 rounded-lg font-semibold transition-all ${
                  priority === pri
                    ? pri === "Critical"
                      ? "bg-red-600 text-white"
                      : pri === "Moderate"
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 text-white"
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
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">
            Fault Description
          </label>
          <textarea
            required
            rows={4}
            value={faultDescription}
            onChange={(e) => setFaultDescription(e.target.value)}
            placeholder="Describe the Fault"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-gray-300 focus:outline-none"
          />
        </div>

        {/* Fault Photo */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-3 uppercase">
            Fault Photo (Optional)
          </label>
          <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition">
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#666666"
              >
                <path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
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
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">
            Fault Occurred Date
          </label>
          <input
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-gray-300 focus:outline-none"
          />
        </div>

        {/* Reporter Name */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">
            Reporter Name
          </label>
          <input
            required
            type="text"
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-gray-300 focus:outline-none"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase">
            Contact Number
          </label>
          <input
            required
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter your contact number"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-gray-300 focus:outline-none"
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
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function FaultForm() {
//   const navigate = useNavigate();
//   const [images, setImages] = useState([]);
//   const [date, setDate] = useState("");

//   const handleImageUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);

//     if (selectedFiles.length > 3) {
//       alert("You can upload a maximum of 3 images.");
//       return;
//     }

//     setImages(selectedFiles);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Fault submitted for asset:", asset);
//     alert("Fault reported successfully!");
//     navigate("/location");
//   };
//   return (
//     <div className="p-4">
//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Fault Type */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Fault Type <span className="text-red-500">*</span>
//           </label>
//           <select
//             required
//             className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
//           >
//             <option value="">Select fault type</option>
//             <option>Work</option>
//             <option>Fault</option>
//             <option>Service</option>
//           </select>
//         </div>

//         {/* Fault Details */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Fault Details <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             required
//             rows={2}
//             placeholder="Briefly Mention the Fault"
//             className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
//           />
//         </div>

//         {/* Priority */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Priority</label>
//           <select className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none">
//             <option value="">Select priority</option>
//             <option>Non-Critical</option>
//             <option>Moderate</option>
//             <option>High</option>
//             <option>Critical</option>
//           </select>
//         </div>

//         {/* Fault Description */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Fault Description <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             required
//             rows={4}
//             placeholder="Describe the Fault"
//             className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
//           />
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Upload Images (Max 3)
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageUpload}
//             className="w-full text-sm mt-2 file:mr-4 file:py-2 file:px-4
//                        file:rounded-lg file:border-0
//                        file:bg-blue-50 file:text-blue-950
//                        hover:file:bg-blue-100"
//           />
//           {images.length > 0 && (
//             <p className="text-xs text-gray-500 mt-1">
//               {images.length} image(s) selected
//             </p>
//           )}
//         </div>

//         {/* Date Selection */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Date <span className="text-red-500">*</span>
//           </label>
//           <input
//             required
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
//           />
//         </div>

//         {/* Reporter Name */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Reporter Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             required
//             type="text"
//             placeholder="S.P. Fernando"
//             className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
//           />
//         </div>

//         {/* Contact Number */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Contact Number <span className="text-red-500">*</span>
//           </label>
//           <input
//             required
//             type="text"
//             placeholder="0118965241"
//             className="w-full rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-blue-200 focus:outline-none"
//           />
//         </div>

//         {/* Verify Checkbox */}
//         <div className="flex items-center gap-2">
//           <input type="checkbox" required className="w-4 h-4" />
//           <label className="text-sm font-medium">
//             I verify that all information is correct
//           </label>
//         </div>

//         {/* Submit Buttons */}
//         <div className="flex gap-3 pt-4 sm:gap-5">
//           <button
//             type="button"
//             onClick={() => navigate("/location")}
//             className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex-1 bg-[#050E3C] text-white py-3 rounded-lg font-medium
//                        hover:bg-[#050E3C]/90 transition-all active:scale-95"
//           >
//             Submit Fault
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
