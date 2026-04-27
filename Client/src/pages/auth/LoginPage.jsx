import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-8">
      <div className="max-w-md mx-auto">
        <Link
          to="/"
          className="inline-block mb-8 text-2xl font-bold"
        >
          <span className="text-violet-400">Book</span>ora
        </Link>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <h2 className="text-3xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-400 mb-6">
            Login to your account
          </p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-gray-400 mt-5 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-violet-400"
            >
              Register
            </Link>
          </p>

          <p className="text-sm text-center mt-4">
            <Link
              to="/"
              className="text-gray-400 hover:text-white"
            >
              ← Back to Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;