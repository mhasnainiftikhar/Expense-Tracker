import React, { useState } from "react";
import { FiTrash2, FiDownload } from "react-icons/fi";

const ExpenseTransactionsList = ({ transactions = [], onDelete, onDownload }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteClick = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (!onDelete) return;
    const confirmed = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await onDelete(id);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-800">Expense Transactions</h2>

        <button
          onClick={onDownload}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <FiDownload size={18} />
          Download Excel
        </button>
      </div>

      {transactions.length === 0 && (
        <p className="text-center text-gray-500 py-6">No expense records found.</p>
      )}

      <div className="flex flex-col gap-4">
        {transactions.map((t) => (
          <article
            key={t._id}
            className="relative group bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition "
          >
            <button
              onClick={(e) => handleDeleteClick(e, t._id)}
              disabled={deletingId === t._id}
              className={`absolute right-3 top-3 p-2 rounded-full text-white transition-all duration-150
                ${deletingId === t._id ? "bg-gray-400 opacity-100" : "bg-red-500 hover:bg-red-600 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 mr-30 mt-4"}`}
            >
              {deletingId === t._id ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiTrash2 size={16} />
              )}
            </button>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-2xl">
                  {t.icon || "🧾"}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{t.category}</p>
                  <p className="text-sm text-gray-500">{t.date ? new Date(t.date).toLocaleDateString() : "-"}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-red-600 font-bold text-lg">₹{Number(t.amount || 0).toLocaleString()}</p>
                
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactionsList;
