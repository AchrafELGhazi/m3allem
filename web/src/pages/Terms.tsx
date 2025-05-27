import { motion } from "framer-motion";

export const TermsPage = () => {
  return (
    <div className='min-h-screen bg-white pt-24'>
      <div className='container mx-auto px-4 max-w-4xl'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-3xl md:text-5xl font-bold text-gray-900 mb-8 text-center'>
            Terms & Conditions
          </h1>

          <div className='bg-gray-50 rounded-3xl p-6 md:p-8 space-y-8'>
            <div>
              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
                1. Service Agreement
              </h2>
              <p className='text-gray-600 leading-relaxed mb-4'>
                By using M3allem, you agree to our service terms. All
                professionals are independently verified and insured for your
                protection. We provide a platform to connect users with service
                providers but are not directly responsible for the services
                performed.
              </p>
              <p className='text-gray-600 leading-relaxed'>
                All bookings are subject to professional availability and
                acceptance. Pricing is set by individual service providers and
                may vary based on location, complexity, and timing of the
                requested service.
              </p>
            </div>

            <div>
              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
                2. Privacy Policy
              </h2>
              <p className='text-gray-600 leading-relaxed mb-4'>
                Your privacy is important to us. We protect your personal
                information and only share necessary details with service
                providers to facilitate your booking requests.
              </p>
              <p className='text-gray-600 leading-relaxed'>
                We collect location data to match you with nearby professionals,
                contact information for communication purposes, and payment
                information for secure transactions. Your data is encrypted and
                stored securely.
              </p>
            </div>

            <div>
              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
                3. Payment Terms
              </h2>
              <p className='text-gray-600 leading-relaxed mb-4'>
                Secure payments are processed through our platform. We take a
                small commission (10-15%) to maintain service quality and
                platform operations. Payments can be made via credit card, debit
                card, or mobile payment methods.
              </p>
              <p className='text-gray-600 leading-relaxed'>
                Cash payments are also accepted for certain services, as agreed
                between you and the service provider. Refunds are handled on a
                case-by-case basis according to our refund policy.
              </p>
            </div>

            <div>
              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
                4. User Responsibilities
              </h2>
              <p className='text-gray-600 leading-relaxed mb-4'>
                Users are responsible for providing accurate information about
                their service needs, ensuring access to the service location,
                and treating service providers with respect.
              </p>
              <p className='text-gray-600 leading-relaxed'>
                Any misuse of the platform, fraudulent activity, or
                inappropriate behavior may result in account suspension or
                termination.
              </p>
            </div>

            <div>
              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
                5. Service Provider Standards
              </h2>
              <p className='text-gray-600 leading-relaxed'>
                All service providers undergo background checks, skill
                verification, and insurance validation. They are required to
                maintain professional standards, arrive on time, and complete
                work to agreed specifications. Ratings and reviews help maintain
                service quality across the platform.
              </p>
            </div>

            <div className='bg-white rounded-2xl p-6 border border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                Contact Us
              </h3>
              <p className='text-gray-600'>
                If you have any questions about these terms and conditions,
                please contact our support team at support@m3allem.ma or call us
                at +212 5XX-XXXX-XX.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
     
    </div>
  );
};
