import messBill from "../models/messBilling.model.js";

// CREATE OR UPDATE MESS BILL (ADMIN)
export const messbilling = async (req, res) => {
  try {
    const { rollno } = req.params;
    const { month, days } = req.body;

    // 1️⃣ Calculate total amount (only present days)
    const totalAmount = days
      .filter(day => day.present)
      .reduce((sum, day) => sum + Number(day.charge), 0);

    // 2️⃣ Check if bill already exists for same user & month
    let bill = await messBill.findOne({ rollno, month });

    if (bill) {
      // 3️⃣ Update existing bill
      bill.days = days;
      bill.totalAmount = totalAmount;
      await bill.save();
    } else {
      // 4️⃣ Create new bill
      bill = new messBill({
        rollno,
        month,
        days,
        totalAmount,
      });
      await bill.save();
    }

    res.status(200).json({
      success: true,
      bill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Bill save failed",
    });
  }
};
