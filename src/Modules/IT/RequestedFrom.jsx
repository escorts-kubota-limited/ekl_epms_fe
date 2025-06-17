import { Button } from "@/Components/ui/button";
import React, { useEffect, useState } from "react";

const RequestFrom = ({ divisionList, deptList, orgList }) => {
  // debugger
  console.log(divisionList,deptList,orgList)
  // State to control popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // State to track selected values
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("");

  // State to track which type is currently selected (department, division, or org)
  const [selectedType, setSelectedType] = useState("");

  // State to store the final selected value
  const [finalSelection, setFinalSelection] = useState({
    type: "",
    value: "",
  });

  //   useEffect(() => {
  //     setRequestFrom(finalSelection);
  //   }, [finalSelection]);

  // Sample data for dropdowns
  const departments = [
    // "HR",
    // "Finance",
    // "IT",
    // "Marketing",
    // "Operations",
    // "Research",
  ];

  const divisions = [
    "North America",
    "South America",
    "Europe",
    "Asia",
    "Africa",
    "Australia",
  ];

  const organizations = [
    "Corporate",
    "Government",
    "Non-profit",
    "Educational",
    "Healthcare",
  ];

  // Function to open popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to close popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Function to handle radio button selection
  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  // Function to handle dropdown selection based on type
  const handleValueSelection = (value) => {
    switch (selectedType) {
      case "department":
        setSelectedDepartment(value);
        break;
      case "division":
        setSelectedDivision(value);
        break;
      case "org":
        setSelectedOrg(value);
        break;
      default:
        break;
    }
  };

  // Function to confirm selection and close popup
  const confirmSelection = () => {
    let value = "";

    switch (selectedType) {
      case "department":
        value = selectedDepartment;
        break;
      case "division":
        value = selectedDivision;
        break;
      case "org":
        value = selectedOrg;
        break;
      default:
        break;
    }

    setFinalSelection({
      type: selectedType,
      value: value,
    });

    closePopup();
  };

  return (
    <div className=" ">
      {/* Main button to open popup */}
      {/* <Button
        onClick={openPopup}
        // className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        className="rounded-xl w-4/5"
      >
        Requested From
      </Button> */}

      {/* Display current selection if available */}
      {finalSelection.value && (
        <div className="mt-4 border rounded bg-gray-50">
          <p className="text-gray-700">
            <span className="font-bold">Selected:</span> {finalSelection.value}{" "}
            ({finalSelection.type})
          </p>
        </div>
      )}

      {/* Popup/Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Select Requested From</h2>

            {/* Selection Type Radio Buttons */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  id="department"
                  name="requestType"
                  value="department"
                  checked={selectedType === "department"}
                  onChange={() => handleTypeSelection("department")}
                  className="focus:ring-blue-500"
                />
                <label htmlFor="department">Department</label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  id="division"
                  name="requestType"
                  value="division"
                  checked={selectedType === "division"}
                  onChange={() => handleTypeSelection("division")}
                  className="focus:ring-blue-500"
                />
                <label htmlFor="division">Division</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="org"
                  name="requestType"
                  value="org"
                  checked={selectedType === "org"}
                  onChange={() => handleTypeSelection("org")}
                  className="focus:ring-blue-500"
                />
                <label htmlFor="org">Organization</label>
              </div>
            </div>

            {/* Conditional Dropdowns */}
            {selectedType === "department" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => handleValueSelection(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select...</option>
                  {deptList.map((dept) => (
                    <option key={dept.department_id} value={dept.department_id}>
                      {dept.dept_name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedType === "division" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Division
                </label>
                <select
                  value={selectedDivision}
                  onChange={(e) => handleValueSelection(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select...</option>
                  {divisionList.map((div) => (
                    <option key={div.id} value={div.id}>
                      {div.fullname}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedType === "org" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Organization
                </label>
                <select
                  value={selectedOrg}
                  onChange={(e) => handleValueSelection(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select...</option>
                  {orgList.map((org) => (
                    <option key={org.org_id} value={org.org_name}>
                      {org.org_name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={closePopup}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmSelection}
                disabled={
                  !selectedType ||
                  (selectedType === "department" && !selectedDepartment) ||
                  (selectedType === "division" && !selectedDivision) ||
                  (selectedType === "org" && !selectedOrg)
                }
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestFrom;
