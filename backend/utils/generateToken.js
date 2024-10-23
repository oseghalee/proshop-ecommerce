import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
      // Generate a JWT token with user ID
      const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
  
      // Set JWT as an HTTP-Only cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Secure cookie for production
        sameSite: "strict", // Protect against CSRF
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days
      });
  
}

export default generateToken;