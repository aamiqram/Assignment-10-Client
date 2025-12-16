import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Apply theme to HTML element whenever it changes
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark mode
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  // Logout handler with toast notification
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      setDropdownOpen(false);
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/80 border-b border-base-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent"
          >
            FinEase
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "hover:text-primary transition"
              }
            >
              Home
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/add-transaction"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary transition"
                  }
                >
                  Add Transaction
                </NavLink>
                <NavLink
                  to="/my-transactions"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary transition"
                  }
                >
                  My Transactions
                </NavLink>
                <NavLink
                  to="/reports"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary transition"
                  }
                >
                  Reports
                </NavLink>
              </>
            )}
          </div>

          {/* Right Side: Theme Toggle + User Menu/Auth Buttons */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                onChange={(e) => handleTheme(e.target.checked)}
                checked={theme === "dark"}
              />
              <FiSun className="swap-off fill-current w-6 h-6" />
              <FiMoon className="swap-on fill-current w-6 h-6" />
            </label>

            {/* User Menu (if logged in) */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="btn btn-circle btn-ghost"
                >
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-xl border border-base-300 py-2 z-50">
                    <div className="px-4 py-2 border-b border-base-300">
                      <p className="font-semibold truncate">
                        {user.displayName}
                      </p>
                      <p className="text-sm text-base-content/60 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-base-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-base-200 text-error"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Auth Buttons (if not logged in)
              <div className="hidden md:flex gap-2">
                <Link to="/login" className="btn btn-ghost">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden btn btn-ghost btn-square"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-base-300">
            <NavLink
              to="/"
              className="block py-2 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/add-transaction"
                  className="block py-2 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Transaction
                </NavLink>
                <NavLink
                  to="/my-transactions"
                  className="block py-2 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Transactions
                </NavLink>
                <NavLink
                  to="/reports"
                  className="block py-2 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reports
                </NavLink>
                <NavLink
                  to="/profile"
                  className="block py-2 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </NavLink>
              </>
            )}
            {!user && (
              <div className="flex gap-2 pt-2">
                <Link
                  to="/login"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
