import axios from "axios";

const API_URL = "https://powerprox.sltidc.lk/GETFaultReg.php";

// Map API fault status to component status format
const mapFaultStatus = (apiStatus) => {
  if (!apiStatus) return "PENDING";
  const statusMap = {
    // New/Pending statuses
    "New": "PENDING",
    "Pending": "PENDING",
    "Created": "PENDING",
    
    // In Progress statuses
    "Submitted": "IN_PROGRESS",
    "In Progress": "IN_PROGRESS",
    "In_Progress": "IN_PROGRESS",
    "Assigned": "IN_PROGRESS",
    "Under Review": "IN_PROGRESS",
    "In Review": "IN_PROGRESS",
    "Escalated": "IN_PROGRESS",
    
    // Completed statuses
    "Completed": "COMPLETED",
    "Resolved": "COMPLETED",
    "Closed": "COMPLETED",
    "Fixed": "COMPLETED",
    "Done": "COMPLETED",
    
    // Rejected/Failed statuses
    "Rejected": "REJECTED",
    "Failed": "REJECTED",
    "Won't Fix": "REJECTED",
    "Cancelled": "REJECTED"
  };
  return statusMap[apiStatus] || "PENDING";
};

// Map priority to status for display
const mapPriorityToStatus = (priority) => {
  if (!priority) return "PENDING";
  const priorityMap = {
    "Critical": "PENDING",
    "High": "IN_PROGRESS",
    "Moderate": "IN_PROGRESS",
    "Non-Critical": "COMPLETED"
  };
  return priorityMap[priority] || "PENDING";
};

// Transform API fault data to component format
const transformFaultData = (apiFault) => {
  // Build location name from available fields
  let locationName = "Unknown Location";
  const locationParts = [];
  if (apiFault.region) locationParts.push(apiFault.region);
  if (apiFault.building) locationParts.push(apiFault.building);
  if (apiFault.floor) locationParts.push(`Floor ${apiFault.floor}`);
  if (apiFault.room) locationParts.push(`Room ${apiFault.room}`);
  if (locationParts.length > 0) {
    locationName = locationParts.join(", ");
  }

  // Determine status with priority
  const status = apiFault.faultStatus 
    ? mapFaultStatus(apiFault.faultStatus) 
    : mapPriorityToStatus(apiFault.priority);

  return {
    id: apiFault.FaultRegID,
    assetType: apiFault.assetType || "Unknown",
    assetId: apiFault.faultId || "N/A",
    locationName: locationName,
    description: apiFault.faultDescription || apiFault.faultDetail || "No description provided",
    status: status,
    reportedDate: apiFault.faultOccurredDate || apiFault.uploadedTime,
    priority: apiFault.priority || "Moderate",
    contactNumber: apiFault.contactNumber || "",
    detailsVerified: apiFault.detailsVerified === "true",
    brand: apiFault.brand || "",
    model: apiFault.model || "",
    faultType: apiFault.faultType || "",
    updatedBy: apiFault.updatedBy || "",
    uploadedTime: apiFault.uploadedTime,
    // Additional fields for detailed view
    region: apiFault.region || "",
    building: apiFault.building || "",
    floor: apiFault.floor || "",
    room: apiFault.room || "",
    faultDetail: apiFault.faultDetail || "",
    faultStatus: apiFault.faultStatus || "",
    uuid: apiFault.UUID || ""
  };
};

// Fetch all faults from API
export const getAllFaults = async () => {
  try {
    const response = await axios.get(API_URL);
    if (Array.isArray(response.data)) {
      return response.data
        .filter(fault => fault.FaultRegID && fault.assetType) // Filter valid entries
        .map(transformFaultData)
        .sort((a, b) => new Date(b.reportedDate) - new Date(a.reportedDate));
    }
    return [];
  } catch (error) {
    console.error("Error fetching faults from API:", error);
    return [];
  }
};

// Fetch user faults (for now returns all faults)
export const getUserFaults = async (userId) => {
  try {
    const allFaults = await getAllFaults();
    
    if (!userId) {
      console.warn("No user ID provided to getUserFaults");
      return [];
    }
    
    // Filter faults where UUID matches the current user's ID
    const userFaults = allFaults.filter(fault => 
      fault.uuid === userId || fault.UUID === userId
    );
    
    return userFaults;
  } catch (error) {
    console.error("Error fetching user faults:", error);
    return [];
  }
};

// Fetch fault by ID
export const getFaultById = async (faultId) => {
  try {
    const allFaults = await getAllFaults();
    const fault = allFaults.find(f => f.id === String(faultId));
    
    if (fault) {
      return {
        ...fault,
        images: [], // API doesn't provide images yet
        history: [
          { status: fault.status, date: fault.reportedDate }
        ],
        technicianComment: fault.updatedBy ? `Last updated by: ${fault.updatedBy}` : null
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching fault by ID:", error);
    return null;
  }
};
