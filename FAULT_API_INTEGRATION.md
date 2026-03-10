# Fault Registration API Integration

## Overview
Updated MyComplaintsPage.jsx and FaultDetailsPage.jsx to fetch real fault data from the PHP API endpoint: `https://powerprox.sltidc.lk/GETFaultReg.php`

## Changes Made

### 1. **faultService.js** - Complete Rewrite
- **Removed**: Mock data and local simulation
- **Added**: Real API integration with data transformation
- **API URL**: `https://powerprox.sltidc.lk/GETFaultReg.php`

#### Key Functions:

**`getAllFaults()`**
- Fetches all fault records from the API
- Filters invalid entries (missing FaultRegID or assetType)
- Maps API data to component format
- Sorts by date (newest first)
- Returns empty array on error

**`getUserFaults(userId)`**
- Wrapper function that returns all faults
- Can be enhanced to filter by user UUID in future

**`getFaultById(faultId)`**
- Fetches all faults and searches for specific ID
- Adds images array (empty for now - API doesn't provide images)
- Builds history timeline from status and date
- Creates technician comment from updatedBy field
- Returns null if fault not found

#### Data Mapping:
```
API Field              →  Component Field
FaultRegID             →  id
assetType              →  assetType
faultId                →  assetId
region+building+floor  →  locationName
faultDescription       →  description
faultOccurredDate      →  reportedDate
faultStatus/priority   →  status (mapped to PENDING/IN_PROGRESS/COMPLETED)
contactNumber          →  contactNumber
brand, model           →  additional info
updatedBy              →  technicianComment
```

#### Status Mapping:
- **API faultStatus → Component Status**:
  - "New" → "PENDING" (Red)
  - "Submitted" → "IN_PROGRESS" (Blue/Dark)
  - "Completed", "Resolved", "Closed" → "COMPLETED" (Green)

- **API Priority → Fallback Status** (if faultStatus is null):
  - "Critical", "High" → IN_PROGRESS
  - "Moderate" → IN_PROGRESS
  - "Non-Critical" → COMPLETED

### 2. **MyComplaintsPage.jsx** - Updated
**Changes**:
- ✅ Removed hardcoded test data modifications
- ✅ Added error state handling
- ✅ Improved loading UI
- ✅ Added fault count display
- ✅ Better error messages to users
- ✅ Fetch from `getUserFaults()` with API integration

**States**:
- Loading: Shows spinner while fetching
- Error: Shows error message if API call fails
- Empty: Shows "No Complaints Yet" message
- Loaded: Displays fault list grid

### 3. **FaultDetailsPage.jsx** - Updated
**Changes**:
- ✅ Removed hardcoded test status modifications
- ✅ Added comprehensive error handling
- ✅ Better error state display (separate from Not Found)
- ✅ Improved loading UI consistency
- ✅ Fetch from `getFaultById()` with API integration

**States**:
- Loading: Shows spinner
- Error: Shows error message
- Not Found: Shows "Fault not found" message
- Loaded: Displays complete fault details with timeline

## API Response Data Structure

The API returns an array of fault objects with these fields:

```json
{
  "FaultRegID": "8",
  "region": "test1",
  "building": null,
  "floor": null,
  "room": null,
  "assetType": "test2",
  "model": "test4",
  "brand": "test3",
  "faultType": "Work",
  "faultDetail": "Maintenance",
  "faultId": "t202407060008",
  "priority": "Moderate",
  "faultDescription": "gtt",
  "faultOccurredDate": "2024-07-03 13:00:00.000",
  "contactNumber": "0552295217",
  "detailsVerified": "true",
  "faultStatus": null,
  "uploadedTime": "2025-06-18 12:44:58",
  "updatedBy": null,
  "UUID": "TestuuidUser"
}
```

## Component Flow

```
MyComplaintsPage.jsx
    ↓
getUserFaults() → getAllFaults() → API Call
    ↓
Transform & Filter Data
    ↓
FaultList.jsx
    ↓
FaultCard.jsx (Multiple Cards)
    ↓
On Click: navigate to /faults/{id}
    ↓
FaultDetailsPage.jsx
    ↓
getFaultById(id) → getAllFaults() → API Call
    ↓
Transform Data & Add History
    ↓
FaultDetails.jsx (Display Component)
```

## Frontend Components (Unchanged)

These components remain unchanged and work with the new data structure:
- ✅ **FaultList.jsx** - No changes needed
- ✅ **FaultCard.jsx** - No changes needed
- ✅ **FaultDetails.jsx** - No changes needed
- ✅ **Navbar.jsx** - No changes needed

## Error Handling

The integration includes:
- ✅ Network error handling (returns empty array)
- ✅ Invalid data filtering (only includes records with FaultRegID and assetType)
- ✅ Null/undefined field handling with fallbacks
- ✅ Status not found handling
- ✅ User-friendly error messages

## Testing Notes

1. **CORS**: Ensure the API server allows cross-origin requests from your React app domain
2. **Network**: Check browser console for any network errors
3. **Data**: Verify the API is returning valid JSON array with expected fields
4. **Sorting**: Faults are sorted by date (newest first)
5. **Filtering**: Only faults with assetType and FaultRegID are displayed

## Future Enhancements

Potential improvements:
- Add image upload support when API provides image URLs
- Implement user-specific filtering by UUID
- Add pagination for large datasets
- Add search and filter functionality
- Cache API responses to reduce calls
- Add real-time status updates
- Implement fault status update endpoints

## Configuration

To modify the API endpoint, update in `faultService.js`:
```javascript
const API_URL = "https://powerprox.sltidc.lk/GETFaultReg.php";
```

To adjust status mappings, modify the `mapFaultStatus()` and `mapPriorityToStatus()` functions.
