import {
  FaCalendarAlt,
  FaChartPie,
  FaCog,
  FaHome,
  FaUsers,
  FaBriefcase,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const items = [
    {
      icon: <FaHome />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <FaCalendarAlt />,
      label: "Bookings",
      path: "/dashboard/bookings",
    },
    {
      icon: <FaBriefcase />,
      label: "Services",
      path: "/dashboard/services",
    },
    {
      icon: <FaUsers />,
      label: "Customers",
      path: "/dashboard/customers",
    },
    {
      icon: <FaChartPie />,
      label: "Analytics",
      path: "/dashboard",
    },
    {
      icon: <FaCog />,
      label: "Settings",
      path: "/dashboard/settings",
    },
  ];

  return (
    <aside className="w-72 min-h-screen border-r border-white/10 bg-black/20 backdrop-blur-xl p-5 hidden md:block sticky top-0">
      {/* Logo */}
      <NavLink to="/" className="block text-2xl font-bold mb-8">
        <span className="text-violet-400">Book</span>ora
      </NavLink>

      {/* Nav */}
      <nav className="space-y-2">
        {items.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <span className="text-sm">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Card */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-gray-400">Upgrade Plan</p>
        <h3 className="font-semibold mt-1">Unlock Premium Features</h3>

        <button className="w-full mt-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 transition">
          Upgrade
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;