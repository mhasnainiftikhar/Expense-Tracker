import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../utils/helper";

const ExpenseOverview = ({ transactions = [], onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const formatted = prepareExpenseLineChartData(transactions);
    setChartData(formatted);
  }, [transactions]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mt-15">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Expense Overview</h2>
          <p className="text-gray-500 text-sm">
            Your complete expense trends with the date record.
          </p>
        </div>

        <button
          onClick={onAddExpense}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg 
                     hover:bg-red-700 transition-all shadow-md"
        >
          <LuPlus size={20} />
          Add Expense
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          All Expenses Chart
        </h3>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#DC2626"
                strokeWidth={3}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ExpenseOverview;
