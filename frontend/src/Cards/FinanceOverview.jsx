import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#4F46E5", "#16A34A", "#DC2626"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const data = [
    { name: "Balance", value: totalBalance || 0 },
    { name: "Income", value: totalIncome || 0 },
    { name: "Expense", value: totalExpense || 0 },
  ];

  const allZero = data.every((d) => d.value === 0);

  const fixedData = allZero
    ? [
        { name: "Balance", value: 1 },
        { name: "Income", value: 1 },
        { name: "Expense", value: 1 },
      ]
    : data;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mt-6 border border-gray-500/20">
      <h2 className="text-xl font-semibold mb-4">
        Finance Overview
      </h2>

      <div className="flex justify-center">
        <PieChart width={350} height={350}>
          <Pie
            data={fixedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={4}
            label
          >
            {fixedData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name, props) =>
              allZero
                ? [`0`, name] 
                : [`${props.payload.value}`, name]
            }
          />

          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default FinanceOverview;
