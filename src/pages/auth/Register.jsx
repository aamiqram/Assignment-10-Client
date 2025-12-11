import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary opacity-10 rounded-full filter blur-2xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-accent opacity-10 rounded-full filter blur-2xl"></div>
      <div className="w-full max-w-md p-4 relative z-10">
        <div className="card bg-base-100 dark:bg-gray-800 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rounded-full filter blur-2xl -mr-16 -mt-16"></div>
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold text-base-content dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-base-content/70 dark:text-gray-300">
              Start your financial journey today
            </p>
          </div>
          <form className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-base-content dark:text-white mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border-2 border-base-300 dark:border-gray-600 bg-base-200 dark:bg-gray-700 text-base-content dark:text-white focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content dark:text-white mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border-2 border-base-300 dark:border-gray-600 bg-base-200 dark:bg-gray-700 text-base-content dark:text-white focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content dark:text-white mb-2">
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Enter photo URL"
                className="w-full px-4 py-3 rounded-xl border-2 border-base-300 dark:border-gray-600 bg-base-200 dark:bg-gray-700 text-base-content dark:text-white focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content dark:text-white mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border-2 border-base-300 dark:border-gray-600 bg-base-200 dark:bg-gray-700 text-base-content dark:text-white focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full py-3 text-lg font-semibold"
            >
              Create Account
            </button>
          </form>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-base-100 dark:bg-gray-800 text-base-content/70 dark:text-gray-300">
                or
              </span>
            </div>
          </div>
          <button className="w-full py-3 px-4 rounded-xl border-2 border-base-300 dark:border-gray-600 bg-base-200 dark:bg-gray-700 text-base-content dark:text-white font-medium hover:border-primary transition-colors flex items-center justify-center gap-3">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
          <p className="text-center mt-8 text-base-content/70 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
