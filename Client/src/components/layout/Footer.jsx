import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Footer() {
  const handleJoin = (e) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
  };

  return (
    <footer
      id="contact"
      className="border-t border-white/10 mt-10 bg-black/20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              <span className="text-violet-400">Book</span>ora
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Smart appointment booking platform for salons,
              clinics, consultants and service businesses.
            </p>

            <div className="flex gap-3 mt-5">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
                (Icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-violet-500 transition"
                  >
                    <Icon size={14} />
                  </button>
                )
              )}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-lg">
              Product
            </h3>

            <ul className="space-y-3 mt-4 text-gray-400">
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>Integrations</li>
              <li>Updates</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg">
              Company
            </h3>

            <ul className="space-y-3 mt-4 text-gray-400">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg">
              Stay Updated
            </h3>

            <p className="text-gray-400 mt-4">
              Get product news and updates directly in your
              inbox.
            </p>

            <form
              onSubmit={handleJoin}
              className="mt-5 flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
              />

              <button className="px-5 rounded-xl bg-violet-500 hover:bg-violet-600 transition">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-gray-400">
          <p>© 2026 Bookora. All rights reserved.</p>

          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <Link to="/login">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;