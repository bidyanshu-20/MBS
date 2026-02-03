// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// export const verifyUser = async (req, res, next) => {
//   try {
//     const token = req.cookies.access_token;

//     if (!token) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     const decoded = jwt.verify(token, "hghghghghgh");

//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     req.user = user; // ✅ THIS IS CRITICAL
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };

// auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token" });
    }

    // console.log("AUTH HEADER:", req.headers.authorization);


     const decoded = jwt.verify(token, "hghghghghgh");

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; 
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default verifyUser;
