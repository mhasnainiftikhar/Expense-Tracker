import React from "react";
import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "./TransactionInfoCard";

const RecentExpenseCard = ({ transactions, onSeeMore }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-semibold text-gray-800">Recent Expenses</h5>

        <button
                  className="card-btn"
                  onClick={onSeeMore}
                >
                  See All <LuArrowRight className="text-base" />
                </button>
      </div>

      {/* EMPTY */}
      {!transactions?.length && (
        <p className="text-gray-400 text-sm text-center py-4">
          No recent expenses found
        </p>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {transactions?.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.category}
            iconType={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="expense"
          />
        ))}
      </div>
    </div>
  );
};

export default RecentExpenseCard;
