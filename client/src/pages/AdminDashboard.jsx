
// export default AdminDashboard;
import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/admin/users", {
      credentials: "include", // JWT cookie
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
      console.log(data.users)
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {users.map((user) => (
        <div
          key={user.rollno}
          style={{ border: "1px solid black", margin: "10px", padding: "10px", cursor: "pointer" }}
          onClick={() => navigate(`/admin/user/${user.rollno}`)}
        >
          <p><b>Name:</b> {user.name}</p>
          <p><b>Roll No:</b> {user.rollno}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;


