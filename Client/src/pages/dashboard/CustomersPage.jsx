import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getCustomers } from "../../services/bookingService";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const res = await getCustomers();
        setCustomers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadCustomers();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-2xl font-bold">Customers</h2>
        <p className="text-gray-400 text-sm mt-1">
          Your customer database and visit history.
        </p>
      </div>

      <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {customers.length === 0 ? (
          <div className="text-gray-400">
            No customers found
          </div>
        ) : (
          customers.map((item, index) => (
            <div
              key={index}
              className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center font-bold text-lg">
                {item.name.charAt(0).toUpperCase()}
              </div>

              <h3 className="text-xl font-semibold mt-4">
                {item.name}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                Last Service: {item.service}
              </p>

              <div className="flex items-center justify-between mt-5 text-sm">
                <span className="text-violet-400">
                  Visits: {item.visits}
                </span>

                <span className="text-gray-400">
                  {item.lastDate}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

export default CustomersPage;