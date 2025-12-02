import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import Footer from "../../components/Layouts/Footer";
import IncomeTransactionsList from '../../Cards/IncomeTransactionsList.jsx'
import IncomeOverview from "../../Income/IncomeOverview.jsx";
import AddIncomeModal from "../../Modals/AddIncomeModal.jsx";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Fetch All Income
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.ALL);

      if (response.data && Array.isArray(response.data.incomes)) {
        setIncomeData(response.data.incomes); 
      }
    } catch (error) {
      console.error("Error fetching income details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Submit Income to Backend
  const handleAddIncome = async (income) => {
    try {
      const payload = {
        source: income.title,
        icon: income.emoji,
        amount: income.amount,
        date: income.date,
      };

      const response = await axiosInstance.post(API_PATHS.INCOME.ADD, payload);

      if (response.data.success) {
        fetchIncomeDetails(); 
        setOpenAddIncomeModal(false);
      }
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };
  // DELETE INCOME
   const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE(id));
      await fetchIncomeDetails();
    } catch (error) {
      console.error("Failed to delete income:", error);
      throw error;
    }
  };

// DOWNLOAD EXCEL
const handleDownloadIncomeDetails = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_EXCEL, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: response.headers["content-type"] });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "income-records.xlsx";
    link.click();

  } catch (err) {
    console.error("Excel download error:", err);
  }
};


  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <>
      <DashboardLayout activeMenu="Income">
        <IncomeOverview
          transactions={incomeData}
          onAddIncome={() => setOpenAddIncomeModal(true)}
        />
        <IncomeTransactionsList
  transactions={incomeData}
  onDelete={deleteIncome}
  onDownload={handleDownloadIncomeDetails}
/>
      </DashboardLayout>

      <AddIncomeModal
        open={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        onSubmit={handleAddIncome}
      />

      <Footer />
    </>
  );
};

export default Income;
