
import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";


const UserDashboard = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userdata, setUserdata] = useState(null);
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔐 JWT

        const res = await fetch("/api/user/messbill", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        console.log("Bills API Response:", data);

        if (data.success && Array.isArray(data.bills)) {
          setBills(data.bills);
          setUserdata(data.user)
        } else {
          setBills([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load mess bills");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);



  const printRef = useRef(null);
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }
    // console.log(element);
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });
    pdf.addImage(data, 'PNG', 0, 0, 100, 100);
    pdf.save("example.pdf")

  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-red-400 flex items-center justify-center">
        {error}
      </div>
    );
  }

  // this is logout function 
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };



  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      {/* 🔹 TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold">
          👋 Welcome to your dashboard,{" "}
          <span className="text-orange-400">{userdata.name}</span>
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-md font-semibold w-fit"
        >
          Sign Out
        </button>
      </div>

      {/* 🔹 USER INFO CARD */}
      <div className="flex justify-end mb-10">
        <div className="bg-slate-800 p-5 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-lg font-semibold mb-3 border-b border-slate-600 pb-2">
            👤 User Details
          </h2>

          <p className="text-sm mb-1">
            <span className="text-gray-400">Name:</span> {userdata.name}
          </p>
          <p className="text-sm mb-1">
            <span className="text-gray-400">Roll No:</span> {userdata.rollno}
          </p>
          <p className="text-sm">
            <span className="text-gray-400">Email:</span> {userdata.email}
          </p>
        </div>
      </div>

      {/* 🔹 MESS BILLS (UNCHANGED) */}
      {bills.length === 0 ? (
        <p className="text-center text-gray-400">
          No mess bills available
        </p>
      ) : (
        bills.map((bill) => (
          <div
            ref={printRef}
            key={bill._id}
            className="bg-slate-800 rounded-xl p-5 mb-6 shadow-lg"
          >
            {/* 🔹 MONTH HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
              <div className="text-xl font-semibold p-2 rounded-md border-2 hover:bg-orange-400 w-fit">
                {new Date(`${bill.month}-01`).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>

              <span className="text-green-400 text-lg font-bold">
                Total Amount: ₹{bill.totalAmount}
              </span>

              <button
                onClick={handleDownloadPdf}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer w-fit"
              >
                Download PDF
              </button>
            </div>

            {/* 🔹 DAYS TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-700">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Charge</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(bill.days) && bill.days.length > 0 ? (
                    bill.days.map((day, index) => (
                      <tr
                        key={index}
                        className="text-center hover:bg-slate-700"
                      >
                        <td className="p-2 border">
                          {new Date(day.date).toLocaleDateString("en-IN")}
                        </td>
                        <td className="p-2 border">
                          {day.present ? "✅ Present" : "❌ Absent"}
                        </td>
                        <td className="p-2 border">
                          ₹{day.present ? day.charge : 0}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="p-3 text-center text-gray-400"
                      >
                        No days data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserDashboard;
