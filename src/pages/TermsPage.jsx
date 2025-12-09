import React from "react";

const TermsPage = () => {
  return (
    <div className="page-container p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 mb-6">
            <svg
              className="w-8 h-8 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-base-content/70">
            Effective from{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="space-y-8">
          <div className="card bg-base-200 border border-base-300 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl text-primary mb-4 justify-center">
                FinEase the Personal Finance Manager
              </h2>
              <p className="text-base-content/80 leading-relaxed text-center">
                Welcome to our platform. These Terms & Conditions outline the
                rules and regulations for the use of our services. By accessing
                this platform, we assume you accept these terms in full. Unless
                otherwise stated, we own the intellectual property rights for
                all material on this platform. All intellectual property rights
                are reserved.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2 pt-4 text-center">
          <p className="text-base-content/60 text-center">
            By using this platform, you acknowledge that you have read and
            understood these Terms & Conditions.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button className="btn-primary px-8">I Accept</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
