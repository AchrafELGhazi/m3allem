import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';

export const FeaturesSection = () => {
  return (
    <section className='py-20 bg-gray-50 overflow-hidden'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl md:text-5xl font-bold text-gray-900 mb-6'>
              Built for Trust & Safety
            </h2>
            <p className='text-lg text-gray-600 mb-8'>
              Every professional on M3allem is thoroughly vetted,
              background-checked, and verified to ensure your safety and
              satisfaction.
            </p>

            <div className='space-y-6'>
              {[
                'Background checks & verification',
                'Real-time tracking & updates',
                'Secure in-app payments',
                '24/7 customer support',
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='flex items-center space-x-4'
                >
                  <div className='w-6 h-6 bg-[#384bf6] rounded-full flex items-center justify-center flex-shrink-0'>
                    <CheckCircle className='w-4 h-4 text-white' />
                  </div>
                  <span className='text-gray-700 text-lg'>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='relative'
          >
            <div className='bg-gradient-to-br from-[#384bf6] to-[#6b82f8] rounded-3xl p-8 md:p-12'>
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20'>
                <div className='text-center'>
                  <div className='w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6'>
                    <Shield className='w-10 h-10 text-[#384bf6]' />
                  </div>
                  <h3 className='text-2xl font-bold text-white mb-4'>
                    100% Verified
                  </h3>
                  <p className='text-white/80'>
                    All professionals undergo rigorous background checks and
                    skill verification
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
