const jwt = require("jsonwebtoken");
const { User } = require("../models/user.models");

const handleOAuthSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/signin?error=Authentication failed`);
    }

    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    res.cookie("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/signin?error=Server error`);
  }
};

module.exports = { handleOAuthSuccess };