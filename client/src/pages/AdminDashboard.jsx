import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        console.log("--->", data);
      });
  }, []);
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };


  const filteredUsers = users.filter((user) =>
    user.rollno
      ?.toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  // this is logout features of my code 
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* <h2 className="text-3xl font-bold text-center mb-8">
        👨‍💼 Admin Dashboard
      </h2> */}
      <div className="flex flex-col">
        <p className="text-3xl font-bold text-center mb-8">
          👨‍💼 Admin Dashboard
        </p>
        <div className=" flex flex-col items-end">
          <button onClick={logout} className="border border-red-500 text-red-500 font-semibold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-200">
            Sign Out
          </button>
        </div>

      </div>

      <Search search={search} onSearchChange={onSearchChange} />


      <div className="max-w-4xl mx-auto space-y-6">
        {/* 🔴 CHANGE 2: USE filteredUsers INSTEAD OF users */}
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-400">
            No user found with this roll number
          </p>
        ) : (
          filteredUsers.map((user, index) => (
            <div
              key={user.rollno}
              onClick={() => navigate(`/admin/user/${user.rollno}`)}
              className={`
                group cursor-pointer
                bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg
                transform transition-all duration-700 ease-out
                hover:scale-[1.02] hover:bg-slate-700 hover:shadow-2xl
                ${index % 2 === 0
                  ? "animate-slide-from-left"
                  : "animate-slide-from-right"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold group-hover:text-blue-400 transition">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    Roll No:{" "}
                    <span className="text-gray-300">{user.rollno}</span>
                  </p>
                </div>

                <span className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">
                  View →
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
