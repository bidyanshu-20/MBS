import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#1e293b",
      color: "white"
    }}>
      <h2>Mess Billing</h2>

      <div>
        <Link to="/" style={{ marginRight: "15px", color: "white" }}>
          Home
        </Link>
        <Link to="/signup" style={{ color: "white" }}>
          SignUp
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
