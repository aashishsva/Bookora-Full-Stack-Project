import {
  FaCalendarAlt,
  FaDollarSign,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function StatCard({ icon, title, value, sub }) {
  return (
    <div className="premium-card rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <div className="text-violet-400 text-xl">{icon}</div>
        <span className="text-xs text-gray-400">{sub}</span>
      </div>

      <p className="text-sm text-gray-400 mt-4">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}

function DashboardPreview() {
  const token = localStorage.getItem("token");

  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-violet-300 mb-4">
            Dashboard Preview
          </p>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Manage Everything from One{" "}
            <span className="text-violet-400">
              Powerful Dashboard
            </span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Monitor bookings, customers, payments and daily
            performance in one beautiful workspace.
          </p>
        </div>

        {/* Dashboard Box */}
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
          {/* Top Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<FaClipboardList />}
              title="Total Bookings"
              value="128"
              sub="+12%"
            />

            <StatCard
              icon={<FaCalendarAlt />}
              title="Today Appointments"
              value="24"
              sub="+8%"
            />

            <StatCard
              icon={<FaDollarSign />}
              title="Revenue"
              value="₹42,800"
              sub="+18%"
            />

            <StatCard
              icon={<FaUsers />}
              title="Customers"
              value="32"
              sub="+15%"
            />
          </div>

          {/* Bottom Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            {/* Chart */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold">
                  Weekly Bookings
                </h3>

                <span className="text-xs text-gray-400">
                  Last 7 Days
                </span>
              </div>

              <div className="h-56 flex items-end gap-3">
                {[35, 55, 42, 70, 58, 80, 66].map((h, i) => (
                  <div key={i} className="flex-1">
                    <div
                      className="rounded-t-xl bg-gradient-to-t from-violet-500 to-blue-400 hover:opacity-90 transition"
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 text-xs text-gray-500 mt-3 text-center">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Upcoming */}
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold">
                  Upcoming Appointments
                </h3>

                <Link
                  to={token ? "/dashboard/bookings" : "/register"}
                  className="text-xs text-violet-400 hover:text-violet-300"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  ["Jane Cooper", "10:00 AM"],
                  ["Robert Fox", "11:30 AM"],
                  ["Wade Warren", "01:00 PM"],
                  ["Dianne Russell", "03:30 PM"],
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                  >
                    <div>
                      <p className="font-medium">{item[0]}</p>
                      <p className="text-xs text-gray-400">
                        Appointment
                      </p>
                    </div>

                    <span className="text-sm text-violet-400">
                      {item[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <p className="text-sm text-gray-400">
              Built for salons, clinics, consultants and
              service businesses.
            </p>

            <Link
              to={token ? "/dashboard" : "/register"}
              className="px-5 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition font-medium text-center"
            >
              {token
                ? "Open Dashboard"
                : "Start Free Trial"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPreview;