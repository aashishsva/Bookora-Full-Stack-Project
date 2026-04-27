import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../services/serviceService";
import toast from "react-hot-toast";

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    duration: "",
    category: "",
  });

  const loadServices = async () => {
    try {
      const res = await getServices();
      setServices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      price: "",
      duration: "",
      category: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateService(editingId, form);
        toast.success("Service updated");
      } else {
        await createService(form);
        toast.success("Service created");
      }

      resetForm();
      setOpen(false);
      loadServices();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      price: item.price,
      duration: item.duration,
      category: item.category,
    });

    setEditingId(item._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this service?");

    if (!confirmDelete) return;

    try {
      await deleteService(id);
      loadServices();

      toast.success("Service deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Services</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage all services offered by your business.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="px-5 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-500/20 transition"
        >
          + Add Service
        </button>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-6">
        {services.map((item) => (
          <div
            key={item._id}
            className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5 hover:border-violet-500/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-violet-400">{item.category}</p>
                <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
              </div>

              <span className="text-sm px-3 py-1 rounded-full bg-black/20">
                {item.duration}min
              </span>
            </div>

            <p className="text-3xl font-bold mt-5">₹{item.price}</p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => handleEdit(item)}
                className="py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:-translate-y-0.5 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1020] p-6"
          >
            <h3 className="text-2xl font-bold mb-5">
              {editingId ? "Edit Service" : "New Service"}
            </h3>

            <input
              name="title"
              placeholder="Service Title"
              value={form.title}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
            />

            <input
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
            />

            <input
              name="duration"
              placeholder="Duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
            />

            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
            />

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full py-3 rounded-xl border border-white/10"
              >
                Cancel
              </button>

              <button className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
}

export default ServicesPage;
