import { FaBars } from "react-icons/fa";

function Topbar({ setSidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "User";

  return (
    <div className="border-b border-white/10 pb-4">
      <div className="flex items-start md:items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-start gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mt-1 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
          >
            <FaBars />
          </button>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              Welcome back, {name}
            </p>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-72 px-4 py-2 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-violet-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Topbar;