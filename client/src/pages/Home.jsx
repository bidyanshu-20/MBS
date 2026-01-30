import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-orange-400 from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Mess Billing System
      </h1>

      <p className="text-gray-300 max-w-xl text-center mb-8">
        A simple and efficient way to manage mess bills.  
        Admins can maintain records while users can securely view their own bills.
      </p>

      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-6 py-3  border-2 border-black hover:bg-amber-700 rounded-lg font-semibold transition">
           Login to Your Account Here.
          </button>
        </Link>

        {/* <Link to="/login">
          <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition">
            Admin Login
          </button>
        </Link> */}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-slate-700 p-6 rounded-xl">
          🔐 Secure Login
        </div>
        <div className="bg-slate-700 p-6 rounded-xl">
          📊 Monthly Bills
        </div>
        <div className="bg-slate-700 p-6 rounded-xl">
          👨‍💼 Admin Control
        </div>
      </div>
    </div>
  );
};

export default Home;
