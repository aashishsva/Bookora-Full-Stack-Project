import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back, {name}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-4 py-2 rounded-xl bg-white/5 border border-white/10 outline-none"
        />

        <div className="w-11 h-11 rounded-full bg-violet-500 flex items-center justify-center font-bold">
          {name.charAt(0).toUpperCase()}
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;