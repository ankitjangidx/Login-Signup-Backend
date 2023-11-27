//auth, isStudent, isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    //extract JWT token
    console.log("cookies", req.cookies);
    console.log("header", req.header("Authorization"));
    const token  = req.header("Authorization").replace("Bearer ","");
    console.log("token", token);
    if (!token || token === undefined)
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    //verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      res.user = decoded;
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//isStudent
exports.isStudent = (req, res, next) => {
  try {
    if (res.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//isAdmin
exports.isAdmin = (req, res, next) => {
  try {
    if (res.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized ",
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
