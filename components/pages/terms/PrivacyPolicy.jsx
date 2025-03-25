const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-jacarta-50 to-jacarta-100 dark:from-jacarta-900 dark:to-jacarta-800 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold  text-gray-900 dark:text-white mb-4 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Privacy Policy
          </h1>
          <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
            <div>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-bold">Effective Updated:</span>{new Date().toLocaleDateString()}
            </p>
            </div>
            <div>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-bold">Last Updated:</span> {new Date().toLocaleDateString()}
            </p>  
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          {/* Introduction Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 py-8 px-14">
            <p className="text-gray-700 dark:text-gray-300">
              {/* <strong>Welcome to Krakengames.quest</strong> By creating an account or using our services, you agree to be bound by these Terms of Service {"("}<strong>&quot;Terms&quot;</strong>{")"}. Please read them carefully. */}
            </p>
          </div>
          <div className=" border-t-2 border-gray-300 dark:border-gray-700 mx-14"></div>

          {/* Terms Sections */}
          <div className="p-8 space-y-12">
            {/* Section Groups */}
            <div className="grid gap-4">
              {/*1. Introduction */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-2xl">1.</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Introduction
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 pb-6">
                Welcome to <strong>Kraken Games </strong>(&quot;<strong>Company</strong>,&quot; &quot;<strong>we</strong>,&quot; &quot;<strong>us</strong>,&quot; or &quot;<strong>our</strong>&quot;). 
                We are committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
                 safeguard your information when you visit our website <strong className="text-blue-400">https://www.krakengames.quest</strong> and use our services (collectively, the &quot;<strong>Platform</strong>&quot;).
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  By accessing or using our Platform, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
                </p>
              </section>

              {/*2. Data We Collect */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-2xl">2.</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Data We Collect
                  </h2>
                </div>
              </section>

              {/*2.1  Personal Data */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-1">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-lg">2.1.</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Personal Data
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 pb-6">
                We may collect personally identifiable information (&quot;<strong>Personal Data</strong>&quot;) that 
                you voluntarily provide to us when you register on the Platform, create or publish content, or otherwise interact with our services.
                </p>

                <p className="text-gray-700 font-bold dark:text-gray-300">Personal Data may include:</p>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>Contact Information: </strong>Name, email address, mailing address, phone number.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong> Account Credentials: </strong>Username and password.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong> Profile Information: </strong>Profile picture, biography, and other details you choose to provide.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>Payment Information: </strong>Billing address and payment method details (processed securely via third-party payment processors).</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong> Content Data: </strong>Any content you create, upload, or contribute to the Platform, including writings, images, audio, or video files.</p></div>
                </div>
              </section>

              {/*2.2  Usage Data */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-1">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-lg">2.2.</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Usage Data
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 pb-6">
                We may collect information that your browser sends whenever you visit our 
                Platform or when you access the Platform through a mobile device (&quot;<strong>Usage Data</strong>&quot;).
                </p>

                <p className="text-gray-700 font-bold dark:text-gray-300">Usage Data may include:</p>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>Technical Information: </strong> IP address, browser type and version, time zone setting, operating system, and platform.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong> Usage Information: </strong>Pages visited, time and date of access, time spent on pages, clickstream data, and other diagnostic data.</p></div>
                </div>
              </section>

              {/*2.3  Cookies and Similar Technologies */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-1">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-lg">2.3.</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Cookies and Similar Technologies
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 pb-6">
                We use cookies and similar tracking technologies to track the activity on our Platform and store certain information
                </p>

                {/* <p className="text-gray-700 font-bold dark:text-gray-300">Usage Data may include:</p> */}
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>Cookies: </strong> Small data files placed on your device.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong> Types of Cookies Used:</strong></p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-9 my-2 gap-4">
                  <span className="flex rounded-full border  bg-white border-gray-800 dark:border-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong> Necessary Cookies: </strong>Essential for the operation of our Platform.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-9 my-2 gap-4">
                  <span className="flex rounded-full border  bg-white border-gray-800 dark:border-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong> Preference Cookies: </strong>Remember your preferences and settings.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-9 my-2 gap-4">
                  <span className="flex rounded-full border  bg-white border-gray-800 dark:border-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong> Analytics Cookies: </strong>Collect information about how you use our Platform.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-9 my-2 gap-4">
                  <span className="flex rounded-full border bg-white border-gray-800 dark:border-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong> Advertising Cookies:  </strong>Deliver advertisements relevant to your interests.</p></div>
                </div>
              </section>

              
              {/*3. How We Use Your Data */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-1">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-2xl">3.</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  How We Use Your Data
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">We use your information for various purposes, including:</p>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>To Provide and Maintain Our Services: </strong> Facilitating account creation, authentication, and user support.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>To Process Transactions:  </strong> Managing payments, fees, and revenue sharing with writers.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>To Communicate with You: </strong> Sending administrative information, updates, security alerts, and support messages.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>To Personalize Your Experience: </strong> Delivering content and resources tailored to your interests.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>To Improve Our Platform:  </strong>  Analyzing data to understand usage trends and enhance functionality.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>To Enforce Our Terms and Policies:  </strong>  Preventing fraudulent activities and ensuring compliance.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>To Comply with Legal Obligations:  </strong> Responding to legal requests and preventing harm.</p></div>
                </div>
              </section>

              {/*4.Data Sharing and Disclosure */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-2xl">4.</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Data Sharing and Disclosure
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                We may share your Personal Data in the following circumstances:
                </p>
              </section>

              {/*4.1  With Service Providers */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-lg">4.1.</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                  With Service Providers
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                We may share your information with third-party vendors who perform services on our behalf, such as:
                </p>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p>Payment processing.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p>Data analysis.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p>Email delivery.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p>Hosting services.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p>Customer support.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p>Marketing assistance.</p></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                These service providers have access to your Personal Data only to perform specific tasks on our
                 behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </section>

              {/*4.2    Legal Obligations */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-lg">4.2.</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Legal Obligations
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                We may disclose your Personal Data if required to do so by law or in response
                 to valid requests by public authorities (e.g., courts or government agencies).
                </p>
              </section>

              {/*4.3  Business Transfers */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-lg">4.3.</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Business Transfers
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                If we are involved in a merger, acquisition, or asset sale, your Personal Data may be transferred to the acquiring entity.
                </p>
              </section>

              {/*4.4  With Your Consent */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-lg">4.4.</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                  With Your Consent
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                We may disclose your Personal Data for any other purpose with your explicit consent.
                </p>
              </section>

              {/*5.  Your Rights Under GDPR */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-1">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-2xl">5.</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Your Rights Under GDPR
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">If you are a resident of the European Economic Area (EEA) or the United Kingdom, you have certain data protection rights:</p>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>Right to Access: </strong> You can request copies of your Personal Data.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>Right to Rectification:  </strong> You can request that we correct any inaccurate or incomplete information.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>Right to Erasure: </strong> You can request that we delete your Personal Data under certain conditions.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>Right to Restrict Processing:  </strong>You can request that we limit the processing of your Personal Data.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>Right to Data Portability:  </strong>  You can request to receive your Personal Data in a structured, commonly used format.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>Right to Object:   </strong>  You can object to our processing of your Personal Data.</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>Right to Withdraw Consent:  </strong> If we process your Personal Data based on consent, you can withdraw it at any time.</p></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">To exercise these rights, please contact us at <strong>news@krakengames.quest</strong>. We may ask you to verify your identity before responding to such requests.</p>
              </section>

              {/*6.  Data Security */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-1">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-2xl">6.</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Data Security
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300  pb-6">We implement appropriate technical and organizational measures to protect your
                   Personal Data against unauthorized access, alteration, disclosure, or destruction.</p>
                <p className="text-gray-700 dark:text-gray-300">However, please note that no method of transmission over the internet or electronic
                   storage is completely secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
              </section>

              {/*7. Data Retention */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-1">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-2xl">7.</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Data Retention
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300  pb-6">We retain your Personal Data only for as long as necessary to fulfill the purposes outlined
                   in this Privacy Policy, comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
              </section>

              {/*8.  International Data Transfers */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-1">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-2xl">8.</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  International Data Transfers
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300  pb-6">Your information, including Personal Data, may be transferred to and maintained
                   on servers located outside of your country or governmental jurisdiction where data protection laws may differ.</p>
                <p className="text-gray-700 dark:text-gray-300">We will take all steps reasonably necessary to ensure that your data is treated securely
                   and in accordance with this Privacy Policy, including using appropriate safeguards such as Standard Contractual Clauses approved by the European Commission.</p>
              </section>

              {/*9. Children's Privacy */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-1">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-2xl">9.</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Children&apos;s Privacy
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300  pb-6">Our Platform is not intended for individuals under the age of 18. We do not knowingly collect Personal Data from children under 18. If you become aware that a child has provided us with Personal Data, please contact us immediately. If we become aware that we have 
                  collected Personal Data from a child under 18 without verification of parental consent, we will take steps to remove that information from our servers.</p>
              </section>

              {/*10. Third-Party Linksy */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-1">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-2xl">10.</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Third-Party Links
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300  pb-6">Our Platform may contain links to third-party websites or services that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or 
                  practices of any third-party sites or services. We encourage you to review the privacy policies of every site you visit.</p>
              </section>

              {/*11.  Changes to This Privacy Policy */}
              <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-1">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-2xl">11.</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Changes to This Privacy Policy
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300  pb-6">We may update our Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.</p>
                <p className="text-gray-700 dark:text-gray-300">We recommend that you review this Privacy Policy periodically for any changes.
                   Changes to this Privacy Policy are effective when they are posted on this page.</p>
              </section>

               {/*12 Contact Us */}
               <section className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-6 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center mb-1">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-4">
                    <span className="text-gray-700 dark:text-blue-400 font-bold text-lg">12</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Contact Us
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 ">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>

                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong>Email: </strong>news@krakengames.quest</p></div>
                </div>
                <div className=" flex text-gray-700 dark:text-gray-300 ml-4 my-2 gap-4">
                  <span className="flex rounded-full bg-gray-800 dark:bg-gray-300 w-1.5 h-1.5 mt-2 "></span>
                  <div ><p><strong> Address: </strong> Office 1, 2A Curzon Road, Ealing, London W5 1NF, United Kingdom</p></div>
                </div>
              
              </section>

              {/* Contact Section */}
              
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
                © {new Date().getFullYear()} Karaken
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy;