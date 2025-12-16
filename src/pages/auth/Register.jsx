import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import {
  FaUser,
  FaEnvelope,
  FaImage,
  FaLock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Password validation checks
  const passwordChecks = {
    length: formData.password.length >= 6,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
  };

  const isPasswordValid =
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.lowercase;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password before submitting
    if (!isPasswordValid) {
      toast.error("Please meet all password requirements");
      return;
    }

    setLoading(true);

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.photoURL
      );
      toast.success("Account created successfully! Welcome to FinEase! 🎉");
      navigate("/");
    } catch (error) {
      console.error(error);

      // User-friendly error messages
      let errorMessage = "Registration failed. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please login instead.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Please choose a stronger password.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google sign up
  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      toast.success("Account created successfully! Welcome! 🎉");
      navigate("/");
    } catch (error) {
      console.error(error);

      let errorMessage = "Google sign up failed.";
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign up popup was closed. Please try again.";
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        errorMessage =
          "An account with this email already exists. Please login.";
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Decorative Background Elements */}
      <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-base-100 p-8 md:p-10 rounded-3xl shadow-2xl border border-base-300 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-2xl mb-4">
            <FaUser size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-base-content/60">
            Start your financial journey today
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaUser className="text-base-content/40" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input input-bordered w-full pl-11"
                placeholder="John Doe"
              />
            </div>
          </div>

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
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input input-bordered w-full pl-11"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Photo URL Field (Optional) */}
          <div>
            <label
              htmlFor="photoURL"
              className="block text-sm font-semibold mb-2"
            >
              Photo URL{" "}
              <span className="text-base-content/60 font-normal text-xs">
                (Optional)
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaImage className="text-base-content/40" />
              </div>
              <input
                type="url"
                id="photoURL"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="input input-bordered w-full pl-11"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <p className="text-xs text-base-content/60 mt-1">
              Leave empty to auto-generate an avatar
            </p>
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input input-bordered w-full pl-11"
                placeholder="••••••••"
              />
            </div>

            {/* Password Requirements Checklist */}
            <div className="mt-3 p-4 bg-base-200 rounded-xl space-y-2">
              <p className="text-sm font-semibold mb-2">
                Password must contain:
              </p>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  {passwordChecks.length ? (
                    <FaCheckCircle className="text-success" />
                  ) : (
                    <FaTimesCircle className="text-error" />
                  )}
                  <span
                    className={
                      passwordChecks.length
                        ? "text-success"
                        : "text-base-content/70"
                    }
                  >
                    At least 6 characters
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {passwordChecks.uppercase ? (
                    <FaCheckCircle className="text-success" />
                  ) : (
                    <FaTimesCircle className="text-error" />
                  )}
                  <span
                    className={
                      passwordChecks.uppercase
                        ? "text-success"
                        : "text-base-content/70"
                    }
                  >
                    One uppercase letter (A-Z)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {passwordChecks.lowercase ? (
                    <FaCheckCircle className="text-success" />
                  ) : (
                    <FaTimesCircle className="text-error" />
                  )}
                  <span
                    className={
                      passwordChecks.lowercase
                        ? "text-success"
                        : "text-base-content/70"
                    }
                  >
                    One lowercase letter (a-z)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !isPasswordValid}
            className="btn btn-primary w-full btn-lg shadow-lg hover:shadow-xl transition-all mt-6"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-6 text-base-content/60">
          or continue with
        </div>

        {/* Google Sign Up Button */}
        <button
          onClick={handleGoogleSignup}
          className="btn btn-outline w-full btn-lg gap-3 hover:bg-base-200"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-center mt-8 text-base-content/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
