const express = require('express');
const protect = require('../middleware/authMiddleware.js');
const { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel } = require('../controllers/incomeController.js');

const router = express.Router();

// Add Income (protected)
router.post('/add', protect, addIncome);

// Get all income (protected)
router.get('/all', protect, getAllIncome);

// Delete income (protected)
router.delete('/:id', protect, deleteIncome);

// Download Excel (protected)
router.get('/download', protect, downloadIncomeExcel);

module.exports = router;
