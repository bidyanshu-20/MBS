const UserList = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Search User</h2>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by Room Number"
        className="w-full px-4 py-2 mb-4 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* USER LIST */}
      <div className="space-y-3 max-h-[70vh] overflow-y-auto">
        {/* SAMPLE USER */}
        <div className="bg-slate-800 p-3 rounded-lg cursor-pointer hover:bg-slate-700">
          <p className="font-medium">Room 101</p>
          <p className="text-sm text-gray-400">Amit Kumar</p>
        </div>

        <div className="bg-slate-800 p-3 rounded-lg cursor-pointer hover:bg-slate-700">
          <p className="font-medium">Room 102</p>
          <p className="text-sm text-gray-400">Rohit Sharma</p>
        </div>
      </div>
    </div>
  );
};

export default UserList;
