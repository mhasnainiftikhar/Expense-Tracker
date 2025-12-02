const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const incomeRoutes = require('./routes/incomeRoutes.js');
const expenseRoutes = require('./routes/expenseRoutes.js');
const dashboardRoutes = require('./routes/dashboardRoutes.js');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
