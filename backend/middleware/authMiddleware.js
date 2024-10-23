import jwt from "jsonwebtoken";
import asyncHandler from './asyncHandler.js';
import User from "../models/userModel.js";

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to req object (excluding password)
      req.user = await User.findById(decoded.userId).select("-password");

      next(); // Call next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token verification failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is admin, proceed to the next middleware
  } else {
    res.status(403); // Forbidden status
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };

