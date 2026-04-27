import { Link } from "react-router-dom";

function BookingSection() {
  const token = localStorage.getItem("token");

  const dates = [12, 13, 14, 15, 16, 17, 18];
  const slots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
  ];

  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-violet-300 mb-4">
            Booking Experience
          </p>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Fast & Easy{" "}
            <span className="text-violet-400">
              Appointment Booking
            </span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Let customers choose services, pick dates and
            confirm appointments in seconds.
          </p>
        </div>

        {/* UI Box */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Service Card */}
          <div className="premium-card rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold">
                Glow Beauty Salon
              </h3>

              <span className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">
                Open Today
              </span>
            </div>

            <div className="space-y-4">
              {[
                ["Haircut", "30 min", "₹250"],
                ["Hair Color", "60 min", "₹800"],
                ["Hair Spa", "45 min", "₹400"],
                ["Beard Trim", "20 min", "₹150"],
              ].map((service, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-black/20 border border-white/10 p-4 flex items-center justify-between hover:bg-white/5 transition"
                >
                  <div>
                    <p className="font-medium">
                      {service[0]}
                    </p>
                    <p className="text-sm text-gray-400">
                      {service[1]}
                    </p>
                  </div>

                  <span className="text-violet-400 font-semibold">
                    {service[2]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Card */}
          <div className="premium-card rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <h3 className="text-xl font-semibold mb-5">
              Select Date & Time
            </h3>

            {/* Dates */}
            <div className="grid grid-cols-7 gap-2">
              {dates.map((day, i) => (
                <button
                  key={i}
                  className={`py-3 rounded-xl text-sm border transition ${
                    day === 15
                      ? "bg-violet-500 border-violet-500"
                      : "border-white/10 bg-black/20 hover:bg-white/5"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Slots */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {slots.map((time, i) => (
                <button
                  key={i}
                  className={`py-3 rounded-xl text-sm border transition ${
                    i === 1
                      ? "bg-violet-500 border-violet-500"
                      : "border-white/10 bg-black/20 hover:bg-white/5"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            {/* CTA */}
            <Link
              to={token ? "/dashboard/bookings" : "/register"}
              className="block w-full mt-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition font-semibold text-center"
            >
              {token
                ? "Manage Bookings"
                : "Confirm Booking"}
            </Link>

            <p className="text-xs text-gray-400 mt-3 text-center">
              Timezone: GMT +05:30
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingSection;