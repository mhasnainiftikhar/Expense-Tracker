import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Cards/CustomBarChart";
import { prepareIncomeBarChartData } from "../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (Array.isArray(transactions)) {
      setChartData(prepareIncomeBarChartData(transactions));
    }
  }, [transactions]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mt-15">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Income Overview</h2>
          <p className="text-gray-500 text-sm">
            Track your income trends and monitor your financial growth.
          </p>
        </div>

        <button
          onClick={onAddIncome}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg 
                     hover:bg-green-700 transition-all shadow-md"
        >
          <LuPlus size={20} />
          Add Income
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          All Incomes Chart
        </h3>

        <div style={{ width: "100%", height: 300 }}>
          <CustomBarChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default IncomeOverview;
