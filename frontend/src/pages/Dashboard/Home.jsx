import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import Footer from "../../components/Layouts/Footer.jsx";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import InfoCards from "../../Cards/InfoCards.jsx";
import RecentIncomeCard from "../../Cards/RecentIncomeCard.jsx";
import RecentExpenseCard from "../../Cards/RecentExpenseCard.jsx";
import { addThousandsSeparator } from "../../utils/helper.js";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import FinanceOverview from "../../Cards/FinanceOverview.jsx";
import Last30DaysIncome from "../../Cards/Last30DaysExpense.jsx";
import Last60DaysIncome from "../../Cards/Last60DaysIncome.jsx";

const Home = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <>
      {/* Entire Dashboard Layout */}
      <DashboardLayout activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          {/* TOP INFO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCards
              icon={<LuWalletMinimal size={30} />}
              label="Total Balance"
              value={
                dashboardData
                  ? addThousandsSeparator(dashboardData.totals.balance)
                  : "0"
              }
              color="#4F46E5"
            />

            <InfoCards
              icon={<LuHandCoins size={30} />}
              label="Total Income"
              value={
                dashboardData
                  ? addThousandsSeparator(dashboardData.totals.totalIncome)
                  : "0"
              }
              color="#16A34A"
            />

            <InfoCards
              icon={<IoMdCard size={30} />}
              label="Total Expense"
              value={
                dashboardData
                  ? addThousandsSeparator(dashboardData.totals.totalExpense)
                  : "0"
              }
              color="#DC2626"
            />
          </div>

          {/* RECENT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentIncomeCard
              transactions={dashboardData?.last5Income || []}
              onSeeMore={() => navigate("/income")}
            />

            <RecentExpenseCard
              transactions={dashboardData?.last5Expense || []}
              onSeeMore={() => navigate("/expense")}
            />
          </div>

          {/* FINANCE OVERVIEW PIE CHART */}
          <div className="mt-6">
            <FinanceOverview
              totalBalance={dashboardData?.totals?.balance || 0}
              totalIncome={dashboardData?.totals?.totalIncome || 0}
              totalExpense={dashboardData?.totals?.totalExpense || 0}
            />
          </div>

          {/* 30 DAYS EXPENSE CHART */}
          <div className="mt-6">
            <Last30DaysIncome
              data={dashboardData?.last30DaysExpense?.transactions || []}
            />
          </div>

          {/* 60 DAYS INCOME CHART */}
          <div className="mt-6">
            <Last60DaysIncome
              data={dashboardData?.last60DaysIncome?.transactions || []}
            />
          </div>
        </div>
      </DashboardLayout>
      <Footer />
    </>
  );
};

export default Home;
