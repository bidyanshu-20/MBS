import User from "../models/user.model.js";
import messBill from "../models/messBilling.model.js";

// export const messbilling = async (req, res) => {
//   try {
//     const rollno = Number(req.params.rollno);
//     const { month, days } = req.body;

//     const user = await User.findOne({ rollno });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     let bill = await messBill.findOne({ user: user._id, month });

//     if (bill) {
//       days.forEach((newDay) => {
//         const index = bill.days.findIndex(
//           (d) => d.date === newDay.date
//         );

//         if (index !== -1) {
//           bill.days[index].charge =
//             Number(bill.days[index].charge) + Number(newDay.charge);

//           bill.days[index].present = newDay.present;
//         } else {
//           // add new day
//           bill.days.push(newDay);
//         }
//       });

//     } else {
//       // create new bill
//       bill = new messBill({
//         user: user._id,
//         rollno,
//         month,
//         days,
//       });
//     }

//     // 🔢 RECALCULATE TOTAL
//     bill.totalAmount = bill.days
//       .filter(day => day.present)
//       .reduce((sum, day) => sum + Number(day.charge), 0);

//     await bill.save();

//     res.status(200).json({
//       success: true,
//       bill,
//     });

//   } catch (error) {
//     console.log("ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: "Bill save failed",
//     });
//   }
// };

export const messbilling = async (req, res) => {
  try {
    const rollno = Number(req.params.rollno);
    const { month, days } = req.body;

    const user = await User.findOne({ rollno });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let bill = await messBill.findOne({ user: user._id, month });

    // 👉 If bill already exists
    if (bill) {
      days.forEach((newDay) => {
        const index = bill.days.findIndex(
          (d) =>
            new Date(d.date).toISOString().slice(0, 10) === newDay.date
        );

        if (index !== -1) {
          // ✅ ADD charge instead of overwrite
          bill.days[index].charge =
            Number(bill.days[index].charge) +
            Number(newDay.charge);

          bill.days[index].present = newDay.present;
        } else {
          // 🆕 new day
          bill.days.push({
            date: newDay.date,
            present: newDay.present,
            charge: Number(newDay.charge),
          });
        }
      });
    } else {
      
      bill = new messBill({
        user: user._id,
        rollno,
        month,
        days: days.map((d) => ({
          date: d.date,
          present: d.present,
          charge: Number(d.charge),
        })),
      });
    }
    
    bill.totalAmount = bill.days
      .filter((day) => day.present)
      .reduce((sum, day) => sum + Number(day.charge), 0);

    await bill.save();

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
