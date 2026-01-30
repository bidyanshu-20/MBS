import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MainLayout from "./layouts/MainLayout";
import AdminUserBill from "./pages/AdminUserBill";
function App() {
  return (
    <BrowserRouter>
      {/* <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes> */}
      {/* Ye uper ke code basic method tha jaha pe navbar alway visible tha ------------ */}


      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="/user/dashboard/:rollno" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/user/:rollno" element={<AdminUserBill />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
