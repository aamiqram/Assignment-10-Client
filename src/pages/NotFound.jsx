import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import { ArrowLeft, HomeIcon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary opacity-10 rounded-full filter blur-2xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-accent opacity-10 rounded-full filter blur-2xl"></div>

      <div className="text-center relative z-10">
        <div className="w-32 h-32 rounded-full bg-error/10 dark:bg-error/5 flex items-center justify-center mx-auto mb-8">
          <FaExclamationTriangle className="text-5xl text-error" />
        </div>

        <h1 className="text-6xl font-bold text-base-content dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-base-content dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-base-content/70 dark:text-gray-300 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist. Use the navigation to
          return home.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="btn-primary px-6 py-3 flex items-center gap-2"
          >
            <ArrowLeft />
            Go Back
          </button>
          <Link
            to="/"
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <HomeIcon size={24} />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
