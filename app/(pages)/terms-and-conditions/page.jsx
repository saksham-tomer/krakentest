import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Terms of Service
          </h1>
          <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
            <p className="text-gray-600 dark:text-gray-400">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          {/* Introduction Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 border-b border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Welcome to our platform. By accessing or using our services, you agree to be bound by these Terms of Service (&quot;Terms&quot;). Please read them carefully.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="p-8 space-y-12">
            {/* Section Groups */}
            <div className="grid gap-12">
              {/* Acceptance */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">1</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Acceptance of Terms
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 ml-14">
                  By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                </p>
              </section>

              {/* Eligibility */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-2 mr-4">
                    <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">2</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Eligibility
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 ml-14">
                  You must be at least 18 years old or have reached the age of majority in your jurisdiction to use our services.
                </p>
              </section>

              {/* User Accounts */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-lg p-2 mr-4">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">3</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    User Accounts
                  </h2>
                </div>
                <div className="space-y-4 ml-14">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300">
                      3.1. You are responsible for maintaining the confidentiality of your account credentials.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300">
                      3.2. You agree to provide accurate and complete information when creating an account.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300">
                      3.3. You are solely responsible for all activities that occur under your account.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Need Help?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    If you have any questions about these Terms, please don&apos;t hesitate to contact us.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition-colors">
                    Contact Support
                  </button>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
                © {new Date().getFullYear()} Your Company Name. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;