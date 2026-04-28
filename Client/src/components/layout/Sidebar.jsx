import { useNavigate, NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaChartPie,
  FaCog,
  FaHome,
  FaUsers,
  FaBriefcase,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
  setCollapsed,
}) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "User";

  const items = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaCalendarAlt />, label: "Bookings", path: "/dashboard/bookings" },
    { icon: <FaBriefcase />, label: "Services", path: "/dashboard/services" },
    { icon: <FaUsers />, label: "Customers", path: "/dashboard/customers" },
    { icon: <FaChartPie />, label: "Analytics", path: "/dashboard" },
    { icon: <FaCog />, label: "Settings", path: "/dashboard/settings" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50 h-screen
          border-r border-white/10 bg-black/20 backdrop-blur-xl
          p-5 flex flex-col transition-all duration-300 overflow-y-auto
          ${collapsed ? "md:w-24" : "md:w-72"}
          w-72
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <NavLink
            to="/"
            className={`font-bold whitespace-nowrap ${
              collapsed ? "text-xl" : "text-2xl"
            }`}
          >
            <span className="text-violet-400">Book</span>
            {!collapsed && "ora"}
          </NavLink>

          {/* Desktop Collapse */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-white/5"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>

          {/* Mobile Close */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5"
          >
            <FaTimes />
          </button>
        </div>

        {/* Nav */}
        <nav className="space-y-2 flex-1">
          {items.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center rounded-xl py-3 transition ${
                  collapsed
                    ? "justify-center px-2"
                    : "gap-3 px-4"
                } ${
                  isActive
                    ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <span className="text-sm">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-6 space-y-4">
          {/* User */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div
              className={`flex items-center ${
                collapsed ? "justify-center" : "gap-3"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center font-bold">
                {name.charAt(0).toUpperCase()}
              </div>

              {!collapsed && (
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
              )}
            </div>

            <button
              onClick={logout}
              className="w-full mt-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition flex items-center justify-center gap-2"
            >
              <FaSignOutAlt />
              {!collapsed && "Logout"}
            </button>
          </div>

          {/* Upgrade */}
          {!collapsed && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-gray-400">Upgrade Plan</p>
              <h3 className="font-semibold mt-1">
                Unlock Premium Features
              </h3>

              <button className="w-full mt-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 transition">
                Upgrade
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;