
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDashboard = () => {
  const { rollno } = useParams();
  const [bills, setBills] = useState([]); // ✅ bills must ALWAYS be an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch(`/api/user/messbill/${rollno}`, {
          credentials: "include",
        });

        const data = await res.json();

        console.log("API Response:", data); // 🔴 ADDED: Debug

        // 🔴 CHANGE #1: SAFELY HANDLE RESPONSE
        if (Array.isArray(data)) {
          setBills(data);
        } else if (Array.isArray(data.data)) {
          setBills(data.data);
        } else {
          setBills([]); // prevent crash
        }

      } catch (err) {
        console.error(err);
        setBills([]); // 🔴 ADDED safety
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [rollno]);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">
        Mess Bill Dashboard
      </h1>

      {/* 🔴 CHANGE #2: SAFE ARRAY CHECK */}
      {Array.isArray(bills) && bills.length === 0 ? (
        <p>No mess bills available</p>
      ) : (
        Array.isArray(bills) &&
        bills.map((bill) => (
          <div
            key={bill._id}
            className="bg-slate-800 rounded-lg p-4 mb-4 shadow"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">
                Month: {bill.month}
              </h2>
              <span className="text-green-400 font-bold">
                ₹{bill.totalAmount}
              </span>
            </div>

            <table className="w-full text-sm border border-slate-700">
              <thead className="bg-slate-700">
                <tr>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Present</th>
                  <th className="p-2 border">Charge</th>
                </tr>
              </thead>
              <tbody>
                {/* 🔴 CHANGE #3: SAFE days check */}
                {Array.isArray(bill.days) &&
                  bill.days.map((day, index) => (
                    <tr key={index} className="text-center">
                      <td className="p-2 border">
                        {new Date(day.date).toLocaleDateString()}
                      </td>
                      <td className="p-2 border">
                        {day.present ? "✅" : "❌"}
                      </td>
                      <td className="p-2 border">
                        ₹{day.present ? day.charge : 0}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default UserDashboard;
