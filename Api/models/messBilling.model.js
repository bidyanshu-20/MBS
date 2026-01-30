import mongoose from "mongoose";

const messBillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rollno: {
      type: String,
      required: true,
    },

    month: {
      type: String, // "2026-01"
      required: true,
    },

    days: [
      {
        date: String,       // "2026-01-01"
        present: Boolean,   // true / false
        charge: Number,     // per-day charge
      },
    ],

    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const messBill = mongoose.model('MessBill',messBillSchema);
export default messBill;