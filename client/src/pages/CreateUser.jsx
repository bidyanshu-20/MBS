const CreateUser = () => {
  return (
    <div className="max-w-lg">
      <h2 className="text-lg font-semibold mb-6">
        Create New User Account
      </h2>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white"
        />

        <input
          type="text"
          placeholder="Room Number"
          className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white"
        />

        <button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
