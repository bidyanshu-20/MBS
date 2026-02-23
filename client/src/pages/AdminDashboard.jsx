// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Search from "../components/Search";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     fetch("/api/admin/users", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data.users);
//         // console.log("--->", data);
//       });
//   }, []);
//   const onSearchChange = (e) => {
//     setSearch(e.target.value);
//   };


//   const filteredUsers = users.filter((user) =>
//     user.rollno
//       ?.toString()
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );


//   // this is logout features of my code 
//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 text-white p-6">
//       {/* <h2 className="text-3xl font-bold text-center mb-8">
//         👨‍💼 Admin Dashboard
//       </h2> */}
//       <div className="flex flex-col">
//         <p className="text-3xl font-bold text-center mb-8">
//           👨‍💼 Admin Dashboard
//         </p>
//         <div className=" flex flex-col items-end">
//           <button onClick={logout} className="border border-red-500 text-red-500 font-semibold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-200">
//             Sign Out
//           </button>
//         </div>

//       </div>

//       <Search search={search} onSearchChange={onSearchChange} />


//       <div className="max-w-4xl mx-auto space-y-6">
//         {/* 🔴 CHANGE 2: USE filteredUsers INSTEAD OF users */}
//         {filteredUsers.length === 0 ? (
//           <p className="text-center text-gray-400">
//             No user found with this roll number
//           </p>
//         ) : (
//           filteredUsers.map((user, index) => (
//             <div
//               key={user.rollno}
//               onClick={() => navigate(`/admin/user/${user.rollno}`)}
//               className={`
//                 group cursor-pointer
//                 bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg
//                 transform transition-all duration-700 ease-out
//                 hover:scale-[1.02] hover:bg-slate-700 hover:shadow-2xl
//                 ${index % 2 === 0
//                   ? "animate-slide-from-left"
//                   : "animate-slide-from-right"
//                 }
//               `}
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-lg font-semibold group-hover:text-blue-400 transition">
//                     {user.name}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     Roll No:{" "}
//                     <span className="text-gray-300">{user.rollno}</span>
//                   </p>
//                 </div>

//                 <span className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">
//                   View →
//                 </span>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
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
        console.log("data is :",data.users)
        setUsers(data.users);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      });
  }, []);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  // useEffect(()=>{
  //   console.log("----->");
  //   console.log(users);
  // })
  const filteredUsers = users.filter((user) =>
    user.rollno
      ?.toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };


  const handleDelete = async (userId) => {
    console.log("User ID IS ", userId);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `/api/auth/admin/delete/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      alert("User deleted successfully");

      // 🔥 Remove deleted user from UI instantly (recommended)
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );

    } catch (error) {
      console.error("Delete error:", error.message);
      alert(error.message);
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-slate-900/70 border-b border-slate-700/50 shadow-lg shadow-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Admin
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-300">Dashboard</span>
          </div>

          <button
            onClick={logout}
            className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-medium rounded-lg shadow-lg shadow-red-900/30 transition-all hover:shadow-red-700/50 hover:-translate-y-0.5 active:scale-95"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Stats */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1">Manage Students</h2>
            <p className="text-slate-400">{users.length} registered users</p>
          </div>

          <div className="w-full sm:w-80">
            <Search search={search} onSearchChange={onSearchChange} />
          </div>
        </div>

        {/* Scrollable User List */}
        <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          {/* List Header */}
          <div className="bg-slate-800/80 px-4 sm:px-6 py-4 border-b border-slate-700 grid grid-cols-[minmax(90px,auto)_2fr_minmax(260px,auto)] gap-4 text-sm font-semibold text-slate-300">
            <div className="text-center sm:text-left">Roll Number</div>
            <div>Student Name</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Scrollable Content */}
          <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900/50 hover:scrollbar-thumb-slate-600 transition-colors">
            {filteredUsers.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                {search
                  ? `No student found with roll number containing "${search}"`
                  : "No students registered yet"}
              </div>
            ) : (
              filteredUsers.map((user, index) => (
                <div
                  key={user.rollno}
                  className={`
                    group grid grid-cols-[minmax(90px,auto)_2fr_minmax(260px,auto)] gap-4 
                    items-center px-4 sm:px-6 py-4 border-b border-slate-800/50
                    hover:bg-slate-800/60 transition-all duration-200
                    ${index % 2 === 0 ? "bg-slate-900/30" : ""}
                  `}
                >
                  {/* Roll Number */}
                  <div className="font-mono text-slate-300 text-center sm:text-left">
                    {user.rollno}
                  </div>

                  {/* Name + Email */}
                  <div>
                    <div className="font-medium group-hover:text-indigo-400 transition-colors">
                      {user.name}
                    </div>
                    {/* <div className="text-xs text-slate-500 mt-0.5">
                      {user.email?.slice(0, 28)}
                      {user._id}
                      {user.email?.length > 28 ? "..." : ""}
                    </div> */}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-2 sm:gap-3">
                    {/* Create Bill */}
                    <button
                      onClick={() => navigate(`/admin/user/${user.rollno}`)}
                      className="min-w-[100px] sm:min-w-[110px] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg bg-emerald-700/90 hover:bg-emerald-600 text-white transition-all hover:shadow-emerald-900/40 active:scale-95 border border-emerald-600/40 hover:border-emerald-500/60 flex items-center justify-center gap-1.5"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Create Bill</span>
                    </button>

                    {/* Delete User */}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="min-w-[100px] sm:min-w-[110px] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg bg-rose-700/90 hover:bg-rose-600 text-white transition-all hover:shadow-rose-900/40 active:scale-95 border border-rose-600/40 hover:border-rose-500/60 flex items-center justify-center gap-1.5"
                      title="Delete this account permanently"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          Click row to view detailed mess billing history (coming soon)
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;