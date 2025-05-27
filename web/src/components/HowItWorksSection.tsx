import { motion } from 'framer-motion';
import { Shield, Star, MapPin, CheckCircle } from 'lucide-react';

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: MapPin,
      title: 'Find Nearby Experts',
      desc: 'Browse professionals on our interactive map',
    },
    {
      icon: Star,
      title: 'Choose & Book',
      desc: 'Select based on ratings, pricing, and availability',
    },
    {
      icon: Shield,
      title: 'Secure Service',
      desc: 'Enjoy safe, verified, and insured services',
    },
    {
      icon: CheckCircle,
      title: 'Rate & Review',
      desc: 'Share your experience to help others',
    },
  ];

  return (
    <section id='how-it-works' className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-5xl font-bold text-gray-900 mb-6'>
            How M3allem Works
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Getting professional help has never been easier. Just follow these
            simple steps.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className='text-center relative'
            >
              {index < 3 && (
                <div className='hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#384bf6] to-transparent'></div>
              )}

              <div className='w-16 h-16 bg-[#384bf6] rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <step.icon className='w-8 h-8 text-white' />
              </div>

              <h3 className='text-xl font-bold text-gray-900 mb-3'>
                {step.title}
              </h3>
              <p className='text-gray-600'>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
