import User from "../models/user.model.js";
import messBill from "../models/messBilling.model.js";
import { io } from "../index.js";
import sendEmail from "../utils/sendEmail.js";


export const messbilling = async (req, res) => {
  try {
    const rollno = req.params.rollno;   // keep as string
    const { month, days } = req.body;

    console.log("BODY RECEIVED:", req.body);

    const user = await User.findOne({ rollno });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let bill = await messBill.findOne({ user: user._id, month });

    // Finding the User Old mess Billing
    
    let oldTotal = 0;
    if (bill) {
      oldTotal = bill.days.reduce((sum, d) => {
        return (
          sum +
          (d.breakfast || 0) +
          (d.lunch || 0) +
          (d.dinner || 0) +
          (d.extras || 0)
        );
      }, 0);
    }

    if (bill) {
      days.forEach((newDay) => {
        const index = bill.days.findIndex(
          (d) =>
            new Date(d.date).toISOString().slice(0, 10) === newDay.date
        );

        if (index !== -1) {
          //  Update existing date
          bill.days[index].breakfast = (bill.days[index].breakfast || 0) + Number(newDay.breakfast || 0);
          bill.days[index].lunch = (bill.days[index].lunch || 0) + Number(newDay.lunch || 0);
          bill.days[index].dinner = (bill.days[index].dinner || 0) + Number(newDay.dinner || 0);
          bill.days[index].extras = (bill.days[index].extras || 0) + Number(newDay.extras || 0);
        } else {
          //  Add new date
          bill.days.push({
            date: newDay.date,
            breakfast: Number(newDay.breakfast) || 0,
            lunch: Number(newDay.lunch) || 0,
            dinner: Number(newDay.dinner) || 0,
            extras: Number(newDay.extras) || 0,
          });
        }
      });
    } else {
      //  Create new monthly bill
      bill = new messBill({
        user: user._id,
        rollno,
        month,
        days: days.map((d) => ({
          date: d.date,
          breakfast: Number(d.breakfast) || 0,
          lunch: Number(d.lunch) || 0,
          dinner: Number(d.dinner) || 0,
          extras: Number(d.extras) || 0,
        })),
      });
    }

    await bill.save();

    // From here i am trying to add mailing system features

    // ✅ NEW TOTAL (after update)
    let newTotal = 0;
    bill.days.forEach((d) => {
      newTotal +=
        (d.breakfast || 0) +
        (d.lunch || 0) +
        (d.dinner || 0) +
        (d.extras || 0);
    });

    // ✅ CURRENT ADDED TOTAL
    let addedTotal = 0;
    days.forEach((d) => {
      addedTotal +=
        (Number(d.breakfast) || 0) +
        (Number(d.lunch) || 0) +
        (Number(d.dinner) || 0) +
        (Number(d.extras) || 0);
    });
    const addedRows = days
      .map(
        (d) => `
        <tr>
          <td>${d.date}</td>
          <td>${d.breakfast || 0}</td>
          <td>${d.lunch || 0}</td>
          <td>${d.dinner || 0}</td>
          <td>${d.extras || 0}</td>
          <td>
            ${(Number(d.breakfast) || 0) +
          (Number(d.lunch) || 0) +
          (Number(d.dinner) || 0) +
          (Number(d.extras) || 0)}
          </td>
        </tr>
      `
      )
      .join("");

    // ✅ SEND EMAIL ONLY IF TOTAL CHANGED
    if (oldTotal !== newTotal) {
      const html = `
        <h2>Mess Bill Update</h2>

        <p>Hello ${user.name},</p>
        <p>New charges have been added for <b>${month}</b>.</p>

        <h3>🆕 Recently Added Charges</h3>
        <table border="1" cellpadding="5" cellspacing="0">
          <tr>
            <th>Date</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
            <th>Extras</th>
            <th>Total</th>
          </tr>
          ${addedRows}
        </table>

        <h3>Added Amount: ₹ ${addedTotal}</h3>

        <hr/>

        <p><b>Previous Total:</b> ₹ ${oldTotal}</p>
        <p><b>Updated Total:</b> ₹ ${newTotal}</p>

        <p>Thank you.</p>
      `;

      sendEmail(user.email, "Mess Bill Updated", html)
        .catch((err) => console.log("Email error:", err));
    }



    // console.log("-->>>",user._id.toString());
    io.to(user._id.toString()).emit("new-bill", {
      message: "New mess bill added"
    });

    // console.log("Realtime bill sent to:", user._id.toString());
    res.status(200).json({
      success: true,
      bill,
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Bill save failed",
    });
  }
};
