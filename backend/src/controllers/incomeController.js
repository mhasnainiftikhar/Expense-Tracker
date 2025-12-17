const User = require("../models/User.js");
const Income = require("../models/Income.js");
const XLSX = require("xlsx");

// ADD INCOME

exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Please provide source, amount, and date" });
    }

    const income = await Income.create({
      userId,
      icon: icon || null,
      source,
      amount,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Income added successfully",
      income,
    });
  } catch (error) {
    console.error("Add Income Error:", error.message);
    res
      .status(500)
      .json({ message: "Error adding income", error: error.message });
  }
};

// GET ALL INCOME

exports.getAllIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: incomes.length,
      incomes,
    });
  } catch (error) {
    console.error("Get All Income Error:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching income records", error: error.message });
  }
};

// DELETE INCOME

exports.deleteIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomeId = req.params.id;

    const income = await Income.findOne({ _id: incomeId, userId });

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    await Income.deleteOne({ _id: incomeId });

    res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    console.error("Delete Income Error:", error.message);
    res.status(500).json({
      message: "Error deleting income",
      error: error.message,
    });
  }
};

// DOWNLOAD EXCEL

exports.downloadIncomeExcel = async (req, res) => {
  try {
    const userId = req.user.id;

    const incomes = await Income.find({ userId }).sort({ date: -1 });

    if (incomes.length === 0) {
      return res.status(404).json({ message: "No income records to download" });
    }

    const formattedData = incomes.map((income) => ({
      Source: income.source,
      Amount: income.amount,
      Date: new Date(income.date).toLocaleDateString(),
      Icon: income.icon || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Incomes");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=incomes.xlsx");

    res.send(buffer);
  } catch (error) {
    console.error("Excel Download Error:", error.message);
    res.status(500).json({
      message: "Error generating Excel file",
      error: error.message,
    });
  }
};
