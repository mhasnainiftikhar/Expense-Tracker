import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import Footer from "../../components/Layouts/Footer";
import ExpenseOverview from "../../Expense/ExpenseOverview.jsx";
import ExpenseTransactionsList from "../../Expense/ExpenseTransactionsList";
import AddExpenseModal from "../../Modals/AddExpenseModal.jsx";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath.js";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Fetch all expenses
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.EXPENSE.ALL);
      if (res.data?.expenses && Array.isArray(res.data.expenses)) {
        setExpenseData(res.data.expenses);
        
      } else {
        setExpenseData([]);
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  // Add expense handler
  const handleAddExpense = async (payload) => {
    try {
      // payload expected: { category, amount, date, icon }
      const res = await axiosInstance.post(API_PATHS.EXPENSE.ADD, payload);
      if (res.data?.success) {
        setOpenAddExpenseModal(false);
        await fetchExpenseDetails();
      }
    } catch (err) {
      console.error("Error adding expense:", err);
      // optional: show toast
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE(id));
      await fetchExpenseDetails();
    } catch (err) {
      console.error("Error deleting expense:", err);
      throw err;
    }
  };

  // Download Excel (server endpoint provides .xlsx)
  const downloadExcel = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXCEL, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expenses.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download Excel file.");
    }
  };

  return (
    <>
      <DashboardLayout activeMenu="Expense">
        <div className="">
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />

          <div className="mt-6">
            <ExpenseTransactionsList
              transactions={expenseData}
              onDelete={deleteExpense}
              onDownload={downloadExcel}
            />
          </div>
        </div>
      </DashboardLayout>

      <AddExpenseModal
        open={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        onSubmit={handleAddExpense}
      />

      <Footer />
    </>
  );
};

export default Expense;
