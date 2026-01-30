import { useParams } from "react-router-dom";
import { useState } from "react";

const AdminUserBill = () => {
  const { rollno } = useParams();

  const [month, setMonth] = useState("");
  const [days, setDays] = useState([]);

  const addDay = () => {
    setDays([...days, { date: "", present: false, charge: 0 }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...days];
    updated[index][field] = value;
    setDays(updated);
  };

  const saveBill = async () => {
    await fetch(`/api/admin/messbill/${rollno}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ month, days }),
    });

    alert("Mess bill saved");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          Mess Bill Management
        </h2>

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
            className="bg-slate-700 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Days Table */}
        <div className="space-y-3">
          {days.map((day, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 items-center bg-slate-700 p-3 rounded-lg"
            >
              <input
                type="date"
                className="bg-slate-800 px-3 py-2 rounded-lg"
                onChange={(e) =>
                  handleChange(index, "date", e.target.value)
                }
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-blue-500"
                  onChange={(e) =>
                    handleChange(index, "present", e.target.checked)
                  }
                />
                Present
              </label>

              <input
                type="number"
                placeholder="Charge"
                className="bg-slate-800 px-3 py-2 rounded-lg"
                onChange={(e) =>
                  handleChange(index, "charge", e.target.value)
                }
              />

              <span className="text-sm text-gray-300">
                Day {index + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={addDay}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition"
          >
            + Add Day
          </button>

          <button
            onClick={saveBill}
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold transition"
          >
            Save Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserBill;
