import React, { useState } from "react";
import { FiTrash2, FiDownload } from "react-icons/fi";

const IncomeTransactionsList = ({ transactions = [], onDelete, onDownload }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteClick = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    if (!onDelete) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this income?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await onDelete(id);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete income. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Income Transactions</h2>

        <button
          onClick={onDownload}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
                     text-white px-4 py-2 rounded-lg transition-all shadow-md"
        >
          <FiDownload size={18} />
          Download Excel
        </button>
      </div>

      {/* Empty */}
      {transactions.length === 0 && (
        <p className="text-center text-gray-500 py-6">No income records found.</p>
      )}

      {/* List */}
      <div className="flex flex-col gap-4">
        {transactions.map((item) => (
          <div
            key={item._id}
            className="relative group bg-white border border-gray-100 
                       rounded-xl p-5 shadow-md hover:shadow-lg transition cursor-default"
          >
            {/* Delete Button */}
            <button
              onClick={(e) => handleDeleteClick(e, item._id)}
              disabled={deletingId === item._id}
              className={`absolute right-3 top-3 p-2 rounded-full text-white 
                transition-all duration-150 mr-30 mt-4
                ${deletingId === item._id
                  ? "bg-gray-400 opacity-100 scale-100"
                  : "bg-red-500 hover:bg-red-600 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                }`}
            >
              {deletingId === item._id ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FiTrash2 size={16} />
              )}
            </button>

            {/* Row */}
            <div className="flex justify-between items-center">
              
              {/* Info */}
              <div className="flex items-center gap-4">
                <div className="text-3xl bg-indigo-50 rounded-full w-12 h-12 flex justify-center items-center">
                  {item.icon || "💰"}
                </div>

                <div>
                  <p className="font-semibold text-gray-800">{item.source}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p className="text-green-600 font-bold text-lg">
                  ₹{Number(item.amount).toLocaleString()}
                </p>
                
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeTransactionsList;
