export const isAdmin = (req, res, next) => {
  
  // console.log("ROLE CHECK:", req.user.role); 
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only access" });
  }
  next();
};
