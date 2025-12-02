import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import moment from "moment";

const Last60DaysIncome = ({ data }) => {
  const safeData = Array.isArray(data)
    ? data.map((item) => ({
        date: moment(item.date).format("DD MMM YYYY"), 
        amount: item.amount,
      }))
    : [];

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mt-6 border border-gray-500/20">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 ">
        Income (Last 60 Days)
      </h2>

      <div className="w-full h-[350px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={safeData}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={5} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="amount" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Last60DaysIncome;
