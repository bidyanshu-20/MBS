// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-orange-400 from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center px-4">
//       <h1 className="text-4xl md:text-5xl font-bold mb-4">
//         Mess Billing System
//       </h1>

//       <p className="text-gray-300 max-w-xl text-center mb-8">
//         A simple and efficient way to manage mess bills.  
//         Admins can maintain records while users can securely view their own bills.
//       </p>

//       <div className="flex gap-4">
//         <Link to="/login">
//           <button className="px-6 py-3  border-2 border-black hover:bg-amber-700 rounded-lg font-semibold transition">
//            Login to Your Account Here.
//           </button>
//         </Link>

//         {/* <Link to="/login">
//           <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition">
//             Admin Login
//           </button>
//         </Link> */}
//       </div>

//       <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//         <div className="bg-slate-700 p-6 rounded-xl">
//           🔐 Secure Login
//         </div>
//         <div className="bg-slate-700 p-6 rounded-xl">
//           📊 Monthly Bills
//         </div>
//         <div className="bg-slate-700 p-6 rounded-xl">
//           👨‍💼 Admin Control
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-amber-600 to-red-800 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Optional subtle background animation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none ">
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -right-20 bottom-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-200 to-white">
            Mess Billing System
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-orange-100/90 max-w-2xl mx-auto mb-12 font-light">
          Simple. Clean. Powerful.<br />
          Manage mess bills the modern way
        </p>

        <div className="flex flex-wrap gap-6 justify-center">
          <Link to="/login">
            <button className="group relative px-10 py-4 bg-white text-orange-900 font-bold rounded-xl text-lg shadow-2xl hover:shadow-orange-500/40 transform hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Login to Your Account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
            </button>
          </Link>
          {/* Uncomment when you need admin login */}
          {/* 
          <Link to="/admin-login">
            <button className="px-10 py-4 bg-transparent border-2 border-white/60 text-white font-bold rounded-xl text-lg hover:bg-white/10 hover:border-white transition-all duration-300">
              Admin Login
            </button>
          </Link>
          */}
        </div>
        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: "🔒", text: "Secure Login", color: "from-blue-500" },
            { icon: "📊", text: "Monthly Bills", color: "from-amber-500" },
            { icon: "👑", text: "Admin Control", color: "from-purple-600" },
          ].map((item, i) => (
            <div
              key={i}
              className={`group bg-gradient-to-br ${item.color} to-slate-900/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/30 hover:scale-[1.04] transition-all duration-300 hover:shadow-2xl`}
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold">{item.text}</h3>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Home;