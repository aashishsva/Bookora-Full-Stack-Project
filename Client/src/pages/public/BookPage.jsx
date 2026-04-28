import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { createPublicBooking } from "../../services/bookingService";
import toast from "react-hot-toast";

function BookPage() {
  const [searchParams] = useSearchParams();

  const selectedService =
    searchParams.get("service") || "Haircut";

  const [loading, setLoading] = useState(false);

  const services = [
    {
      category: "Salon",
      items: ["Haircut", "Hair Spa", "Hair Color", "Beard Trim"],
    },
    {
      category: "Healthcare",
      items: ["Consultation", "Dental Checkup", "Skin Checkup"],
    },
    {
      category: "Beauty",
      items: ["Facial", "Makeup", "Nail Care"],
    },
    {
      category: "Fitness",
      items: ["Training", "Yoga Session", "Diet Consultation"],
    },
    {
      category: "Business",
      items: ["Session", "Consulting Call", "Strategy Meeting"],
    },
  ];

  const allServices = services.flatMap((group) => group.items);

  const slots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const [form, setForm] = useState({
    customer: "",
    service: selectedService,
    date: "",
    time: "10:00 AM",
    userId: "PUT_ADMIN_USER_ID_HERE",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customer || !form.date) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      await createPublicBooking(form);

      toast.success("Booking Confirmed 🎉");

      setForm({
        ...form,
        customer: "",
        date: "",
        time: "10:00 AM",
      });
    } catch (error) {
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Top */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            to="/"
            className="text-violet-400 hover:text-violet-300"
          >
            ← Back Home
          </Link>

          <div className="text-sm text-gray-400">
            Trusted by Salons • Clinics • Coaches • Experts
          </div>
        </div>

        {/* Hero */}
        <div className="mt-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            Book Your{" "}
            <span className="text-violet-400">Appointment</span>
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Choose a service, select your preferred date & time,
            and confirm your booking instantly.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mt-10">
          {/* Left - Services */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold mb-5">
              Select Service
            </h2>

            <div className="space-y-5">
              {services.map((group) => (
                <div key={group.category}>
                  <p className="text-sm text-gray-400 mb-2">
                    {group.category}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {group.items.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            service: item,
                          })
                        }
                        className={`px-3 py-3 rounded-xl text-sm border transition ${
                          form.service === item
                            ? "bg-violet-500 border-violet-500"
                            : "bg-black/20 border-white/10 hover:bg-white/5"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">
              Confirm Details
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Selected: {form.service}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
            >
              <input
                type="text"
                name="customer"
                placeholder="Your Full Name"
                value={form.customer}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none"
              />

              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none"
              >
                {allServices.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none"
              />

              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none"
              >
                {slots.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <button
                disabled={loading}
                className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition font-semibold disabled:opacity-60"
              >
                {loading
                  ? "Booking..."
                  : `Confirm ${form.service}`}
              </button>
            </form>

            {/* Bottom Info */}
            <div className="mt-6 rounded-2xl bg-black/20 border border-white/10 p-4">
              <p className="text-sm text-gray-400">
                ✔ Instant confirmation
              </p>
              <p className="text-sm text-gray-400 mt-2">
                ✔ Easy rescheduling
              </p>
              <p className="text-sm text-gray-400 mt-2">
                ✔ Trusted appointment system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;