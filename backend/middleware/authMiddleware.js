const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const User = require('../models/Users');

 
const checkAuth = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const jwtToken = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_ACCESS_SECRET_KEY);

        req.user = await User.findById(decoded.id).select('-password');
// console.log('decoded', decoded)
        req.roles = decoded.roles;
        if (!req.user) {
            return res.status(404).json({ message: 'User not found 3' });
        }
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(403).json({ message: 'Forbidden' });
    }
});


const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

module.exports = { checkAuth, admin };
