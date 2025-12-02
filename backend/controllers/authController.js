const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register User
const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        return res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl || ""
            }
        });

    } catch (err) { 
        console.error("Register Error:", err.message);
        return res.status(500).json({ message: "Error registering user", error: err.message });
    }
};


// Login User
const loginUser = async (req, res) => { 
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        
        return res.status(200).json({
            success: true,
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        return res.status(500).json({ message: "Error logging in user", error: err.message });
    }    
};

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profileImageUrl: user.profileImageUrl
        });
    } catch (err) {
        console.error("Get Profile Error:", err.message);
        return res.status(500).json({ message: "Error fetching user profile", error: err.message });
    }
};
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
};
