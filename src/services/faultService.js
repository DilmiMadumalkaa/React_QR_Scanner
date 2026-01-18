import axios from "axios";

const API_BASE = "http://localhost:8080"; // adjust if needed

// export const getUserFaults = async (userId) => {
//   const response = await axios.get(`${API_BASE}/faults/user/${userId}`);
//   return response.data;
// };

// export const getFaultById = async (faultId) => {
//   const response = await axios.get(`${API_BASE}/faults/${faultId}`);
//   return response.data;
// };


export const getUserFaults = async (userId) => {
  return [
    {
      id: 1,
      assetType: "Water System",
      assetId: "WS-001",
      locationName: "Floor 3, Room 301",
      description: "Water leakage detected in the corner of the room. Water is dripping from the ceiling affecting the equipment and furniture. Immediate action required to prevent further damage.",
      status: "PENDING",
      reportedDate: "2024-12-20T08:00:00Z"
    },
    {
      id: 2,
      assetType: "Electrical Panel",
      assetId: "EP-045",
      locationName: "Main Hall",
      description: "Power outage in the entire Block C. All lights and equipment are non-functional. This is affecting the main operations and staff productivity.",
      status: "IN_PROGRESS",
      reportedDate: "2024-12-21T09:30:00Z"
    },
    {
      id: 3,
      assetType: "Air Conditioning Unit",
      assetId: "AC-023",
      locationName: "Office 205",
      description: "AC unit is not functioning properly. The room temperature is rising and cooling has completely stopped. Maintenance required urgently.",
      status: "RESOLVED",
      reportedDate: "2024-12-19T10:15:00Z"
    }
  ];
};

export const getFaultById = async (faultId) => {
  const faults = {
    1: {
      id: 1,
      assetType: "Water System",
      assetId: "WS-001",
      locationName: "Floor 3, Room 301",
      description: "Water leakage detected in the corner of the room. Water is dripping from the ceiling affecting the equipment and furniture. Immediate action required to prevent further damage to the building infrastructure and equipment.",
      status: "PENDING",
      reportedDate: "2024-12-20T08:00:00Z",
      images: ["https://via.placeholder.com/300"],
      history: [
        { status: "PENDING", date: "2024-12-20T08:00:00Z" }
      ],
      technicianComment: null
    },
    2: {
      id: 2,
      assetType: "Electrical Panel",
      assetId: "EP-045",
      locationName: "Main Hall",
      description: "Power outage in the entire Block C. All lights and equipment are non-functional. This is affecting the main operations and staff productivity. Generator might need inspection.",
      status: "IN_PROGRESS",
      reportedDate: "2024-12-21T09:30:00Z",
      images: ["https://via.placeholder.com/300"],
      history: [
        { status: "PENDING", date: "2024-12-21T09:30:00Z" },
        { status: "IN_PROGRESS", date: "2024-12-21T11:00:00Z" }
      ],
      technicianComment: "Generator is being inspected. Will update soon."
    },
    3: {
      id: 3,
      assetType: "Air Conditioning Unit",
      assetId: "AC-023",
      locationName: "Office 205",
      description: "AC unit is not functioning properly. The room temperature is rising and cooling has completely stopped. Maintenance required urgently to restore comfort levels.",
      status: "RESOLVED",
      reportedDate: "2024-12-19T10:15:00Z",
      images: ["https://via.placeholder.com/300"],
      history: [
        { status: "PENDING", date: "2024-12-19T10:15:00Z" },
        { status: "IN_PROGRESS", date: "2024-12-19T14:00:00Z" },
        { status: "RESOLVED", date: "2024-12-20T11:00:00Z" }
      ],
      technicianComment: "AC unit replaced. System is now working fine."
    }
  };

  return faults[faultId] || faults[1];
};
