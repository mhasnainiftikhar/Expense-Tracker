import React from "react";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";

const TransactionInfoCard = ({ title, iconType, date, amount, type }) => {
  const bgColor =
    type === "income" ? "bg-green-100" : "bg-red-100";

  const displayedIcon =
    iconType && iconType.length > 0 ? (
      <span className="text-2xl">{iconType}</span>
    ) : type === "income" ? (
      <LuTrendingUp className="text-green-500 w-6 h-6" />
    ) : (
      <LuTrendingDown className="text-red-500 w-6 h-6" />
    );

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        <div className={`${bgColor} p-3 rounded-full w-12 h-12 flex items-center justify-center`}>
          {displayedIcon}
        </div>

        <div className="flex flex-col">
          <p className="text-gray-800 font-medium text-base">{title}</p>
          <p className="text-gray-400 text-sm">{date}</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-1">
        <span
          className={`font-semibold text-base ${
            type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          {type === "income" ? "+" : "-"}${amount}
        </span>

        {type === "income" ? (
          <LuTrendingUp className="text-green-600 w-4 h-4" />
        ) : (
          <LuTrendingDown className="text-red-600 w-4 h-4" />
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
