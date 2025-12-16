import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Where to redirect after login (default to home)
  const from = location.state?.from?.pathname || "/";

  // Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Login successful! Welcome back! 🎉");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);

      // User-friendly error messages
      let errorMessage = "Login failed. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Login successful! Welcome! 🎉");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);

      let errorMessage = "Google login failed.";
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Login popup was closed. Please try again.";
      } else if (error.code === "auth/cancelled-popup-request") {
        errorMessage = "Login cancelled.";
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Decorative Background Elements */}
      <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-base-100 p-8 md:p-10 rounded-3xl shadow-2xl border border-base-300 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-2xl mb-4">
            <FaLock size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-base-content/60">Log in to manage your finances</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-base-content/40" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full pl-11"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-base-content/40" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full pl-11"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full btn-lg shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-6 text-base-content/60">
          or continue with
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full btn-lg gap-3 hover:bg-base-200"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-center mt-8 text-base-content/60">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
