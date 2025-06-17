import React from "react";

function Alert({ message, onClose }) {
  // console.log(message)
  return (
    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex justify-between items-center">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold">
        ×
      </button>
    </div>
  );
}

export default Alert;
