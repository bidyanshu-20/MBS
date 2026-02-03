import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { toast } from "react-toastify";

const Login = () => {

    const navigate = useNavigate();
    // const [role, setRole] = useState("user");
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setError(false);
        if (!formData.email || !formData.password) {
            toast.warning("Please fill all fields");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success === false) {

                setLoading(false);
                setError(data.message);
                toast.error("Login failed");
                return;
            }
            setLoading(false);
            setError(null);

            toast.success("Login successful 🎉");
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);

            // Role-based redirect
            // console.log("Helloo.....");
            // console.log(data);

            const role = data.user.role.toLowerCase();
            // console.log("----------");
            // console.log(data.user.rollno)
            if (role === "admin") {
                navigate("/admin/dashboard");
            } else if (role === "user") {
                navigate(`/user/dashboard/${data.user.rollno}`);
            }

        } catch (error) {
            setLoading(false);
            setError(error.message);
            toast.error("Something........ went wrong!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                    Login to Your Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* <div>
                        <label className="block text-gray-300 mb-1">Role (Admin/User)</label>
                        <select
                            id="role"
                            value={formData.role || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select Your Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div> */}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-gray-400 text-sm text-center mt-6">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-400 hover:text-blue-500 font-medium"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
