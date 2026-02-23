
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminUserBill = () => {
  const { rollno } = useParams();
  const navigate = useNavigate();

  const currentMonth = new Date().toISOString().slice(0, 7);

  const [month, setMonth] = useState(currentMonth);
  const [days, setDays] = useState([]);
  const [savedBill, setSavedBill] = useState(null);

  const addDay = () => {
    setDays([
      ...days,
      {
        date: "",
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        extras: 0,
      },
    ]);
  };

  const handleMove = () => {
    navigate("/admin/dashboard");
  };

  const handleChange = (index, field, value) => {
    const updated = [...days];
    updated[index][field] = field === "date" ? value : Number(value);
    setDays(updated);
  };

  const calculateDayTotal = (day) => {
    return (
      (day.breakfast || 0) +
      (day.lunch || 0) +
      (day.dinner || 0) +
      (day.extras || 0)
    );
  };

  // ✅ SAVE BILL
  const saveBill = async () => {
    try {
      const res = await fetch(`/api/admin/messbill/${rollno}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ month, days }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Mess bill saved successfully");
        setSavedBill(data.bill);

        setDays([]); // optional reset
      } else {
        alert("Failed to save bill");
      }
    } catch (err) {
      console.error(err);
    }
  };
  // console.log("roll no is:",rollno);
  // console.log(typeof rollno);
  // ✅ FETCH SAVED BILL
  const token = localStorage.getItem("token");

  const fetchSavedBills = async () => {
    // console.log(rollno);
    // console.log(month);
    try {
      const res = await fetch(
        `/api/admin/messbill/${rollno}?month=${month}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      console.log("----->", data.bills);
      if (data.success && data.bills.length > 0) {
        setSavedBill(data.bills[0]);
        // console.log("----->", savedBill);
      } else {
        alert("No bill found for this month");
        setSavedBill(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("Updated savedBill:", savedBill);
  }, [savedBill]);

 const handleDelete = (biilId)=>{
      console.log("i am delete handler");
      console.log(biilId);
 }




  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <button
        onClick={handleMove}
        className="border-2 p-2 m-5 rounded-xl bg-amber-300 text-black hover:bg-amber-400 cursor-pointer"
      >
        Move to Previous Page
      </button>

      <div className="max-w-6xl mx-auto bg-slate-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Mess Bill Management</h2>

        <p className="text-gray-400 mb-4">
          Roll No: <span className="text-white font-semibold">{rollno}</span>
        </p>

        {/* Month Picker */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-300">
            Select Month
          </label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg"
          />
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 font-semibold text-gray-300 mb-3">
          <span>Date</span>
          <span>Breakfast</span>
          <span>Lunch</span>
          <span>Dinner</span>
          <span>Extras</span>
          <span>Total</span>
        </div>

        {/* Days Rows */}
        <div className="space-y-3">
          {days.map((day, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-4 items-center bg-slate-700 p-3 rounded-lg"
            >
              <input
                type="date"
                className="bg-slate-800 px-3 py-2 rounded-lg"
                value={day.date}
                onChange={(e) =>
                  handleChange(index, "date", e.target.value)
                }
              />

              <input
                type="number"
                className="bg-slate-800 px-3 py-2 rounded-lg"
                value={day.breakfast}
                onChange={(e) =>
                  handleChange(index, "breakfast", e.target.value)
                }
              />

              <input
                type="number"
                className="bg-slate-800 px-3 py-2 rounded-lg"
                value={day.lunch}
                onChange={(e) =>
                  handleChange(index, "lunch", e.target.value)
                }
              />

              <input
                type="number"
                className="bg-slate-800 px-3 py-2 rounded-lg"
                value={day.dinner}
                onChange={(e) =>
                  handleChange(index, "dinner", e.target.value)
                }
              />

              <input
                type="number"
                className="bg-slate-800 px-3 py-2 rounded-lg"
                value={day.extras}
                onChange={(e) =>
                  handleChange(index, "extras", e.target.value)
                }
              />

              <span className="text-green-400 font-semibold">
                ₹ {calculateDayTotal(day)}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={addDay}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold"
          >
            + Add Day
          </button>

          <button
            onClick={saveBill}
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold"
          >
            Save Bill
          </button>

          <button
            onClick={fetchSavedBills}
            className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg font-semibold"
          >
            Fetch Saved Bill
          </button>
        </div>

        {/* ✅ DISPLAY SAVED BILL BELOW */}
        {savedBill && (
          <div className="mt-10 bg-slate-700 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">
              Saved Bill for {savedBill.month}
            </h3>
            <button
              onClick={() => handleDelete(savedBill._id)}
              className="min-w-[100px] sm:min-w-[110px] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg bg-rose-700/90 hover:bg-rose-600 text-white transition-all hover:shadow-rose-900/40 active:scale-95 border border-rose-600/40 hover:border-rose-500/60 flex items-center justify-center gap-1.5"
              title="Delete this account permanently"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Delete</span>
            </button>

            <div className="grid grid-cols-6 gap-4 font-semibold text-gray-300 mb-3">
              <span>Date</span>
              <span>Breakfast</span>
              <span>Lunch</span>
              <span>Dinner</span>
              <span>Extras</span>
              <span>Total</span>
            </div>

            {savedBill.days.map((day, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 bg-slate-800 p-3 rounded-lg mb-2"
              >
                <span>
                  {new Date(day.date).toISOString().slice(0, 10)}
                </span>
                <span>{day.breakfast}</span>
                <span>{day.lunch}</span>
                <span>{day.dinner}</span>
                <span>{day.extras}</span>
                <span className="text-green-400 font-semibold">
                  ₹ {day.total}
                </span>
              </div>
            ))}

            <div className="mt-4 text-right text-xl font-bold text-yellow-400">
              Monthly Total: ₹ {savedBill.totalAmount}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserBill;
