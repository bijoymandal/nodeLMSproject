import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = await User.findById(decoded.id).select("-password");

    //   req.user = decoded.user; // { id, role }
      return next();
    } catch (err) {
      console.error("JWT Error:", err.message);


      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired. Please login again." });
      }

      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token. Access denied." });
      }

      return res.status(401).json({ message: "Not authorized, token failed." });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided. Authorization denied." });
  }
};
