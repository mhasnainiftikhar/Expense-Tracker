const express = require('express');
const protect = require('../middleware/authMiddleware.js');

const {
    addExpense,
    getAllExpenses,
    deleteExpense,
    downloadExpenseExcel
} = require('../controllers/expenseController.js');

const router = express.Router();

// Add expense
router.post('/add', protect, addExpense);

// Get all expenses
router.get('/all', protect, getAllExpenses);

// Delete expense
router.delete('/:id', protect, deleteExpense);

// Download Excel
router.get('/download', protect, downloadExpenseExcel);

module.exports = router;
