const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/db.js');
const authRoutes = require('./src/routes/authRoutes.js');
const incomeRoutes = require('./src/routes/incomeRoutes.js');
const expenseRoutes = require('./src/routes/expenseRoutes.js');
const dashboardRoutes = require('./src/routes/dashboardRoutes.js');
const errorMiddleware = require('./src/middleware/errorMiddleware.js');
const API_VERSION = process.env.API_VERSION;
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
app.use(`${API_VERSION}/auth`, authRoutes);
app.use(`${API_VERSION}/income`, incomeRoutes);
app.use(`${API_VERSION}/expense`, expenseRoutes);
app.use(`${API_VERSION}/dashboard`, dashboardRoutes);


// Error Handling Middleware
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
