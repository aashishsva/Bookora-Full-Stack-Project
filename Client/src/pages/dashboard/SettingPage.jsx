import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getSettings, saveSettings } from "../../services/settingService";
import toast from "react-hot-toast";

function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    currency: "INR",
    timezone: "Asia/Kolkata",
    slotDuration: "30",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getSettings();
        setForm({
          businessName: res.data.businessName || "",
          ownerName: res.data.ownerName || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          currency: res.data.currency || "INR",
          timezone: res.data.timezone || "Asia/Kolkata",
          slotDuration: res.data.slotDuration || "30",
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await saveSettings(form);
      toast.success("Settings saved");
    } catch (error) {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-gray-400 text-sm mt-1">
          Manage your business preferences.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="premium-card mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 max-w-3xl"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="businessName"
            placeholder="Business Name"
            value={form.businessName}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          />
          <input
            name="ownerName"
            placeholder="Owner Name"
            value={form.ownerName}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          />
          <input
            name="currency"
            placeholder="Currency"
            value={form.currency}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          />
          <input
            name="slotDuration"
            placeholder="Slot Duration"
            value={form.slotDuration}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          />
        </div>

        <input
          name="timezone"
          placeholder="Timezone"
          value={form.timezone}
          onChange={handleChange}
          className="w-full mt-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          rows="4"
          className="w-full mt-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
        />

        <button
          disabled={loading}
          className="mt-5 px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </DashboardLayout>
  );
}

export default SettingsPage;
