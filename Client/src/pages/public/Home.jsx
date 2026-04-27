import Navbar from "../../components/layout/Navbar";
import Features from "../../components/common/Features";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DashboardPreview from "../../components/common/DashboardPreview";
import BookingSection from "../../components/common/BookingSection";
import PricingSection from "../../components/common/PricingSection";
import Footer from "../../components/layout/Footer";
import CursorGlow from "../../components/common/CursorGlow";

function Home() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      id="home"
      className="min-h-screen bg-[#050816] text-white overflow-hidden relative"
    >
      <Navbar />
      <CursorGlow />

      {/* Global Glow Background */}
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute top-96 right-10 w-80 h-80 bg-blue-500/20 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500/10 blur-[140px] rounded-full animate-pulse"></div>
      </div>

      {/* Hero */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-20">
        {/* Hero Glow */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div>
            <p className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-violet-300 mb-6">
              #1 Smart Booking Platform
            </p>

            {token && (
              <p className="text-sm text-green-400 mb-4">
                Welcome back, {user?.name} 👋
              </p>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              The Smart Way to <br />
              <span className="text-violet-400">Manage Bookings</span> <br />
              for Every Business
            </h1>

            <p className="mt-6 text-gray-400 text-lg max-w-xl leading-8">
              Streamline appointments, manage customers, accept payments,
              and grow your business with one powerful platform.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={token ? "/dashboard" : "/register"}
                className="px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition font-semibold"
              >
                {token ? "Go to Dashboard" : "Start Free Trial"}
              </Link>

              <Link
                to={token ? "/dashboard/bookings" : "/login"}
                className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition"
              >
                {token ? "View Bookings" : "View Demo"}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 text-center">
              <div className="premium-card rounded-2xl p-4 bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Businesses
                </p>
              </div>

              <div className="premium-card rounded-2xl p-4 bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold">50K+</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Bookings
                </p>
              </div>

              <div className="premium-card rounded-2xl p-4 bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold">98%</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* Right Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="premium-card rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Dashboard Overview
              </h2>

              <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                Live
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["Bookings", "128"],
                ["Revenue", "₹42,800"],
                ["Customers", "32"],
                ["Today", "24"],
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-black/30 border border-white/5"
                >
                  <p className="text-gray-400 text-sm">
                    {item[0]}
                  </p>
                  <h3 className="text-2xl font-bold mt-2">
                    {item[1]}
                  </h3>
                </div>
              ))}
            </div>

            <div className="mt-6 h-32 rounded-2xl bg-gradient-to-r from-violet-500/30 to-blue-500/20 flex items-end p-4 overflow-hidden">
              <div className="w-full h-1 bg-white/20 rounded-full"></div>
            </div>

            <Link
              to={token ? "/dashboard" : "/register"}
              className="block mt-6 w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition text-center font-semibold"
            >
              {token ? "Open Workspace" : "Get Started"}
            </Link>
          </motion.div>
        </div>
      </section>

      <Features />
      <DashboardPreview />
      <BookingSection />
      <PricingSection />
      <Footer />
    </div>
  );
}

export default Home;