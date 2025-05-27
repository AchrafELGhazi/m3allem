import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className='py-20 bg-gradient-to-r from-[#384bf6] to-[#6b82f8] relative overflow-hidden'>
      <div className='absolute inset-0'>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-white/20 rounded-full'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className='container mx-auto px-4 text-center relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl md:text-5xl font-bold text-white mb-6'>
            Ready to Get Started?
          </h2>
          <p className='text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto'>
            Join thousands of satisfied customers who trust M3allem for their
            home service needs.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            className='bg-white text-[#384bf6] px-8 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-2 mx-auto transition-all'
          >
            <span>Download M3allem</span>
            <ArrowRight className='w-5 h-5' />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
