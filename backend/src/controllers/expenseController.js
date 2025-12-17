const User = require('../models/User.js');
const Expense = require('../models/Expense.js');
const XLSX = require('xlsx');


// ADD EXPENSE

exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: 'Please provide category, amount, and date' });
        }

        const expense = await Expense.create({
            userId,
            icon: icon || null,
            category,
            amount,
            date
        });

        res.status(201).json({
            success: true,
            message: 'Expense added successfully',
            expense
        });

    } catch (error) {
        console.error('Add Expense Error:', error.message);
        res.status(500).json({ message: 'Error adding expense', error: error.message });
    }
};



// GET ALL EXPENSES

exports.getAllExpenses = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: expenses.length,
            expenses
        });
    } catch (error) {
        console.error('Get All Expenses Error:', error.message);
        res.status(500).json({ message: 'Error fetching expense records', error: error.message });
    }
};



// DELETE EXPENSE

exports.deleteExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenseId = req.params.id;

        const expense = await Expense.findOne({ _id: expenseId, userId });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        await Expense.deleteOne({ _id: expenseId });

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });

    } catch (error) {
        console.error("Delete Expense Error:", error.message);
        res.status(500).json({
            message: "Error deleting expense",
            error: error.message
        });
    }
};



// DOWNLOAD EXCEL (EXPENSES)

exports.downloadExpenseExcel = async (req, res) => {
    try {
        const userId = req.user.id;

        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        if (expenses.length === 0) {
            return res.status(404).json({ message: "No expense records to download" });
        }

        const formattedData = expenses.map(expense => ({
            Category: expense.category,
            Amount: expense.amount,
            Date: new Date(expense.date).toLocaleDateString(),
            Icon: expense.icon || "-"
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");

        res.send(buffer);

    } catch (error) {
        console.error("Excel Download Error:", error.message);
        res.status(500).json({
            message: "Error generating Excel file",
            error: error.message
        });
    }
};
