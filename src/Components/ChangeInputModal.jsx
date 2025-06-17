import React, { useState } from "react";
import { X, ArrowDown, ArrowRight } from "lucide-react";

const ChangeInputModal = ({
  showModal,
  setShowModal,
  setAffectNextRow,
  handleUpdate,
  rowIndex,
  value
}) => {
  const [rows, setRows] = useState([
    { id: 1, value: "100", label: "Item 1" },
    { id: 2, value: "200", label: "Item 2" },
    { id: 3, value: "300", label: "Item 3" },
    { id: 4, value: "400", label: "Item 4" },
    { id: 5, value: "500", label: "Item 5" },
  ]);

//   console.log(rowIndex,value)

  const [pendingChange, setPendingChange] = useState(null);
  const [originalValue, setOriginalValue] = useState("");

  const handleInputChange = (id, newValue) => {
    const rowIndex = rows.findIndex((row) => row.id === id);
    const currentRow = rows[rowIndex];

    // Store the original value and pending change
    setOriginalValue(currentRow.value);
    setPendingChange({
      rowId: id,
      rowIndex,
      newValue,
      oldValue: currentRow.value,
    });

    // Show modal only if there are subsequent rows
    if (rowIndex < rows.length - 1) {
      setShowModal(true);
    } else {
      // If it's the last row, just update it
      updateSingleRow(id, newValue);
    }
  };

  const updateSingleRow = (id, newValue) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, value: newValue } : row))
    );
  };

  const updateRowAndNext = () => {
    if (!pendingChange) return;

    const { rowId, rowIndex, newValue, oldValue } = pendingChange;
    const difference = parseFloat(newValue) - parseFloat(oldValue);

    setRows((prev) =>
      prev.map((row, index) => {
        if (row.id === rowId) {
          return { ...row, value: newValue };
        } else if (index > rowIndex) {
          const currentValue = parseFloat(row.value);
          const newRowValue = (currentValue + difference).toString();
          return { ...row, value: newRowValue };
        }
        return row;
      })
    );

    closeModal();
  };

  const updateRowOnly = () => {
    if (!pendingChange) {
      closeModal();
      return;
    }
    updateSingleRow(pendingChange.rowId, pendingChange.newValue);
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setPendingChange(null);
    setOriginalValue("");
  };

  const cancelChange = () => {
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      {/* <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Smart Input Manager
        </h1>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-white text-xl font-semibold">Data Rows</h2>
            <p className="text-blue-100 text-sm mt-1">
              Modify values and choose how changes propagate
            </p>
          </div>
          
          <div className="p-6 space-y-4">
            {rows.map((row, index) => (
              <div key={row.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {row.label}
                  </label>
                  <input
                    type="number"
                    value={row.value}
                    onChange={(e) => handleInputChange(row.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                    placeholder="Enter value"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">
                Duration Added
              </h3>
              <button
                onClick={cancelChange}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* <p className="text-gray-600 mb-6">
                You've changed the value from{" "}
                <span className="font-semibold text-red-600">
                  {originalValue}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-green-600">
                  {pendingChange?.newValue}
                </span>
                . How would you like to apply this change?
              </p> */}

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setAffectNextRow(false);
                    handleUpdate(false)
                    setShowModal(false);
                  }}
                  className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">
                        Add to current task's duration only
                      </div>
                      {/* <div className="text-sm text-gray-500">
                        Update only the current row
                      </div> */}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setAffectNextRow(true);
                    handleUpdate(true)
                    setShowModal(false);
                  }}
                  className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <ArrowDown className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">
                        Update next target date as per duration
                      </div>
                      {/* <div className="text-sm text-gray-500">
                        Apply change to subsequent rows
                      </div> */}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={cancelChange}
                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeInputModal;
