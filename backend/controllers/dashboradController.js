const Income = require("../models/Income.js");
const Expense = require("../models/Expense.js");
const { Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Validate ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userObjectId = new Types.ObjectId(userId);

    const today = new Date();
    const sixtyDaysAgo = new Date(today);
    sixtyDaysAgo.setDate(today.getDate() - 60);

    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    
    // INCOME LAST 60 DAYS
    
    const incomeLast60 = await Income.find({
      userId: userObjectId,
      createdAt: { $gte: sixtyDaysAgo },
    }).sort({ createdAt: -1 });

    const totalIncomeLast60 = incomeLast60.reduce(
      (sum, income) => sum + income.amount,
      0
    );

    const last5Income = incomeLast60.slice(0, 5);

    
    // EXPENSE LAST 30 DAYS
    
    const expenseLast30 = await Expense.find({
      userId: userObjectId,
      createdAt: { $gte: thirtyDaysAgo },
    }).sort({ createdAt: -1 });

    const totalExpenseLast30 = expenseLast30.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const last5Expense = expenseLast30.slice(0, 5);

    
    // OVERALL TOTALS
   
    const allIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = allIncomeAgg[0]?.total || 0;

    const allExpensesAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = allExpensesAgg[0]?.total || 0;

    const balance = totalIncome - totalExpense;

    

   
    // RESPONSE
    
    return res.status(200).json({
      success: true,
      totals: {
        totalIncome,
        totalExpense,
        balance,
      },
      last60DaysIncome: {
        total: totalIncomeLast60,
        transactions: incomeLast60,
      },
      last30DaysExpense: {
        total: totalExpenseLast30,
        transactions: expenseLast30,
      },
      last5Income,
      last5Expense,
    });
  } catch (error) {
    console.error("Dashboard Error:", error.message);
    return res.status(500).json({
      message: "Error fetching dashboard data",
      error: error.message,
    });
  }
};
