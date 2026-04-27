import SectionWrapper from "./SectionWrapper";
import { Link } from "react-router-dom";

function PricingSection() {
  const token = localStorage.getItem("token");

  const plans = [
    {
      name: "Starter",
      price: "₹0",
      desc: "Perfect for small businesses starting online bookings.",
      features: [
        "Up to 50 bookings / month",
        "Basic dashboard",
        "Email notifications",
        "1 team member",
      ],
      active: false,
    },
    {
      name: "Pro",
      price: "₹499",
      desc: "Best for growing businesses that need automation.",
      features: [
        "Unlimited bookings",
        "Advanced analytics",
        "Payments integration",
        "5 team members",
      ],
      active: true,
    },
    {
      name: "Enterprise",
      price: "₹1499",
      desc: "For teams and large businesses needing full control.",
      features: [
        "Custom branding",
        "Priority support",
        "Unlimited team members",
        "API access",
      ],
      active: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-violet-300 mb-4">
            Pricing Plans
          </p>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Simple Pricing for{" "}
            <span className="text-violet-400">
              Every Business
            </span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Choose a plan that fits your business size and
            scale as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <SectionWrapper key={i} delay={i * 0.1}>
              <div
                className={`premium-card h-full rounded-3xl border p-6 backdrop-blur-xl transition hover:-translate-y-2 ${
                  plan.active
                    ? "border-violet-500 bg-violet-500/10 scale-105"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.active && (
                  <span className="inline-block mb-4 text-xs px-3 py-1 rounded-full bg-violet-500 text-white">
                    Most Popular
                  </span>
                )}

                <h3 className="text-2xl font-bold">
                  {plan.name}
                </h3>

                <p className="text-4xl font-bold mt-4">
                  {plan.price}
                  <span className="text-base text-gray-400">
                    /mo
                  </span>
                </p>

                <p className="text-gray-400 mt-3 min-h-[52px]">
                  {plan.desc}
                </p>

                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2"
                    >
                      <span className="text-violet-400">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to={token ? "/dashboard" : "/register"}
                  className={`block w-full mt-8 py-3 rounded-xl font-semibold text-center transition ${
                    plan.active
                      ? "bg-violet-500 hover:bg-violet-600"
                      : "bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {token
                    ? "Open Dashboard"
                    : "Get Started"}
                </Link>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;