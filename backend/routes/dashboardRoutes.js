const express = require('express');
const protect = require('../middleware/authMiddleware.js');
const { getDashboardData } = require('../controllers/dashboradController.js');

const router = express.Router();

// Dashboard route
router.get('/data', protect, getDashboardData);

module.exports = router;
