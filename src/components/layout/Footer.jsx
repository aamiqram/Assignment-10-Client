import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 border-t border-base-300 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-[-100px] left-[20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[20%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              FinEase
            </h3>
            <p className="text-base-content/70 leading-relaxed">
              Your trusted companion for personal finance management. Take
              control of your money, track expenses, and achieve your financial
              goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-base-content/70 hover:text-primary transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/my-transactions"
                  className="text-base-content/70 hover:text-primary transition"
                >
                  My Transactions
                </Link>
              </li>
              <li>
                <Link
                  to="/reports"
                  className="text-base-content/70 hover:text-primary transition"
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-base-content/70 hover:text-primary transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-base-content/70">
                <HiMail className="w-5 h-5 text-primary" />
                <span>support@finease.com</span>
              </li>
              <li className="flex items-center gap-2 text-base-content/70">
                <HiPhone className="w-5 h-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-base-content/70">
                <HiLocationMarker className="w-5 h-5 text-primary" />
                <span>123 Finance St, Money City</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-base-300 hover:bg-primary hover:text-white flex items-center justify-center transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-base-300 hover:bg-primary hover:text-white flex items-center justify-center transition"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-base-300 hover:bg-primary hover:text-white flex items-center justify-center transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-base-300 hover:bg-primary hover:text-white flex items-center justify-center transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-base-300 mt-8 pt-8 text-center">
          <p className="text-base-content/60">
            © {currentYear} FinEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
