import SectionWrapper from "./SectionWrapper";
import {
  FaCalendarCheck,
  FaBell,
  FaChartLine,
  FaUsers,
  FaCreditCard,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <FaCalendarCheck />,
    title: "Smart Booking",
    desc: "Customers can book appointments anytime with real-time slot availability.",
  },
  {
    icon: <FaClock />,
    title: "Schedule Manager",
    desc: "Set working hours, breaks, holidays and auto-manage time slots.",
  },
  {
    icon: <FaUsers />,
    title: "Customer Management",
    desc: "Store customer details, booking history and preferences in one place.",
  },
  {
    icon: <FaCreditCard />,
    title: "Payments & Invoices",
    desc: "Accept online payments and manage invoices smoothly.",
  },
  {
    icon: <FaBell />,
    title: "Notifications",
    desc: "Send booking confirmations, reminders and updates instantly.",
  },
  {
    icon: <FaChartLine />,
    title: "Analytics Reports",
    desc: "Track revenue, bookings and business performance with insights.",
  },
];

function Features() {
  const token = localStorage.getItem("token");

  return (
    <section id="features" className="py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-violet-300 mb-4">
            Powerful Features
          </p>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Everything You Need to{" "}
            <span className="text-violet-400">Run Your Business</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Built for modern service businesses to manage appointments,
            payments, customers and growth from one powerful dashboard.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <SectionWrapper key={index} delay={index * 0.08}>
              <div className="premium-card group h-full p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-violet-400/40 transition duration-300">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/20 text-violet-400 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-7 min-h-[84px]">
                  {item.desc}
                </p>

                <Link
                  to={token ? "/dashboard" : "/register"}
                  className="inline-block mt-5 text-violet-400 font-medium hover:text-violet-300 transition"
                >
                  {token ? "Open Dashboard →" : "Learn More →"}
                </Link>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;