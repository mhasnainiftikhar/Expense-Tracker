import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const RecentIncomeCard = ({ transactions, onSeeMore }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-semibold text-gray-800">Recent Incomes</h5>

        <button
          className="card-btn "
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {transactions?.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            iconType={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="income"
          />
        ))}

        {!transactions?.length && (
          <p className="text-gray-400 text-sm text-center py-4">
            No recent incomes found
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentIncomeCard;
