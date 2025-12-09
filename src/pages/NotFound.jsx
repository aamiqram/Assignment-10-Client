import { Link } from "react-router-dom";
import { ArrowLeft, HomeIcon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-100 via-base-100 to-base-200">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-bold text-base-content mb-6">
          Page Not Found
        </h2>
        <p className="text-xl text-base-content/70 mb-8">
          Oops! The page you're looking for seems to have wandered off into the
          digital void.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
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
