import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getBookingStats } from "../../services/bookingService";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function StatCard({ title, value, sub }) {
  return (
    <div className="premium-card rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
      <p className="text-xs text-violet-400 mt-2">{sub}</p>
    </div>
  );
}

function DashboardHome() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    today: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getBookingStats();
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadStats();
  }, []);

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "Completed", value: stats.completed },
    {
      name: "Other",
      value: Math.max(
        stats.total - stats.pending - stats.completed,
        0
      ),
    },
  ];

  const barData = [
    { day: "Mon", bookings: 4 },
    { day: "Tue", bookings: 6 },
    { day: "Wed", bookings: 3 },
    { day: "Thu", bookings: 8 },
    { day: "Fri", bookings: 5 },
    { day: "Sat", bookings: 7 },
    { day: "Sun", bookings: 2 },
  ];

  return (
    <DashboardLayout>
      {/* Stats */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Bookings" value={stats.total} sub="All records" />
        <StatCard title="Pending" value={stats.pending} sub="Need action" />
        <StatCard title="Completed" value={stats.completed} sub="Finished jobs" />
        <StatCard title="Today" value={stats.today} sub="Today schedule" />
      </div>

      {/* Charts */}
      <div className="grid xl:grid-cols-2 gap-6 mt-6">
        {/* Pie */}
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-xl font-semibold mb-4">Booking Status</h3>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#22c55e" />
                  <Cell fill="#3b82f6" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar */}
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-xl font-semibold mb-4">Weekly Bookings</h3>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip />
                <Bar dataKey="bookings" fill="#8b5cf6" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardHome;