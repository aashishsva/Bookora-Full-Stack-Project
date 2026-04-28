import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "Hair Salon", path: "/book?service=Haircut" },
    { name: "Doctor Appointment", path: "/book?service=Consultation" },
    { name: "Beauty Parlour", path: "/book?service=Facial" },
    { name: "Fitness Trainer", path: "/book?service=Training" },
    { name: "Consultant Meeting", path: "/book?service=Session" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="w-full border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-[#050816]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <span className="text-violet-400">Book</span>ora
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-white transition"
            >
              {item.name}
            </a>
          ))}

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setServiceOpen(!serviceOpen)}
              className="flex items-center gap-2 hover:text-white transition"
            >
              Services <FaChevronDown size={12} />
            </button>

            {serviceOpen && (
              <div className="absolute top-10 left-0 w-60 rounded-2xl border border-white/10 bg-[#0b1020] p-2 shadow-2xl">
                {services.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-3 rounded-xl hover:bg-white/5 transition"
                    onClick={() => setServiceOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/book"
            className="px-5 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 transition font-medium"
          >
            Book Now
          </Link>

          {token ? (
            <>
              <span className="text-sm text-gray-300 hidden lg:block">
                Hi, {user?.name}
              </span>

              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#050816] px-6 py-5 space-y-4">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-gray-300 hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </a>
          ))}

          {/* Services */}
          <div className="pt-2">
            <p className="text-sm text-gray-400 mb-2">Services</p>

            <div className="space-y-2">
              {services.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="block py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition font-medium text-center"
            >
              Book Now
            </Link>

            {token ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="w-full py-3 rounded-xl border border-white/10 text-center hover:bg-white/5 transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="w-full py-3 rounded-xl border border-white/10 text-center hover:bg-white/5 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;