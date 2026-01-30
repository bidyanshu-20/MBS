import messBill from "../models/messBilling.model.js";

/*
|--------------------------------------------------------------------------
| USER → VIEW ONLY HIS OWN MESS BILLS
|--------------------------------------------------------------------------
| Security:
|  - User sirf apna hi data dekh sakta hai
|
| Route:
|  - GET /api/user/messbill/:rollno
|
| Access:
|  - Logged-in User
|--------------------------------------------------------------------------
*/
export const getUserMessBillByRollno = async (req, res) => {
  try {
    const { rollno } = req.params;

    // 1️⃣ Security check
    if (req.user.rollno !== rollno) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // 2️⃣ Fetch user's mess bills
    const bills = await messBill.find({ rollno });

    res.status(200).json({
      success: true,
      bills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bill",
    });
  }
};
