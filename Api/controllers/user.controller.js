import User from "../models/user.model.js";

export const getAllUsersForAdmin = async (req, res) => {
  try {
    // 1️⃣ Only fetch normal users (exclude admins)
    const users = await User.find({ role: "User" })
      .select("name rollno");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};


export const test = (req,res)=>{
    res.json({
        massage:'hello world...',
    });
}