import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../../services/bookingService";
import toast from "react-hot-toast";

function Badge({ status }) {
  const styles = {
    Confirmed: "bg-green-500/15 text-green-400",
    Pending: "bg-yellow-500/15 text-yellow-400",
    Completed: "bg-blue-500/15 text-blue-400",
    Cancelled: "bg-red-500/15 text-red-400",
  };

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || styles.Pending
      }`}
    >
      {status}
    </span>
  );
}

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const initialForm = {
    customer: "",
    service: "",
    date: "",
    time: "",
  };

  const [form, setForm] = useState(initialForm);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await getBookings();
      setBookings(res.data);
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => setForm(initialForm);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customer || !form.service || !form.date || !form.time) {
      return toast.error("Please fill all fields");
    }

    try {
      setSaving(true);
      await createBooking(form);
      toast.success("Booking created");
      resetForm();
      setOpen(false);
      loadBookings();
    } catch (error) {
      toast.error("Failed to create booking");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this booking?");
    if (!confirmDelete) return;

    try {
      await deleteBooking(id);
      toast.success("Booking deleted");
      loadBookings();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateBooking(id, { status });
      toast.success("Status updated");
      loadBookings();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Bookings</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage all appointments in one place.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 transition"
        >
          + New Booking
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead className="bg-black/20 text-left text-sm text-gray-400">
              <tr>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Service</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Time</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center">
                    Loading...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-8 text-center text-gray-400"
                  >
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-white/10 hover:bg-white/5"
                  >
                    <td className="px-5 py-4">{item.customer}</td>
                    <td className="px-5 py-4">{item.service}</td>
                    <td className="px-5 py-4">{item.date}</td>
                    <td className="px-5 py-4">{item.time}</td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Badge status={item.status} />
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatus(item._id, e.target.value)
                          }
                          className="bg-gray-800 border border-white/10 rounded-lg px-2 py-1 text-sm outline-none"
                        >
                          <option>Pending</option>
                          <option>Confirmed</option>
                          <option>Completed</option>
                          <option>Cancelled</option>
                        </select>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1020] p-6"
          >
            <h3 className="text-2xl font-bold mb-5">New Booking</h3>

            <input
              name="customer"
              placeholder="Customer Name"
              value={form.customer}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
            />

            <input
              name="service"
              placeholder="Service"
              value={form.service}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
            />

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
            />

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="w-full py-3 rounded-xl border border-white/10"
              >
                Cancel
              </button>

              <button
                disabled={saving}
                className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
}

export default BookingsPage;