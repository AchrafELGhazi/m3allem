import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone, Play } from 'lucide-react';

export const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      style={{ y, opacity }}
      className='min-h-screen bg-gradient-to-br from-[#384bf6] via-[#4c63f7] to-[#6b82f8] relative overflow-hidden flex items-center justify-center'
    >
      {/* Animated Background Elements */}
      <div className='absolute inset-0'>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-2 h-2 bg-white/10 rounded-full'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className='container mx-auto px-4 pt-20 relative z-10'>
        <div className='text-center'>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-4xl md:text-7xl font-bold text-white mb-6 leading-tight'
          >
            Find Trusted Home
            <br />
            <span className='bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
              Service Experts
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed'
          >
            Connect with verified professionals for quick, reliable, and secure
            home repairs and installations across Morocco. Your trusted
            craftsmen are just a tap away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className='bg-white text-[#384bf6] px-8 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-2 transition-all'
            >
              <Smartphone className='w-5 h-5' />
              <span>Download App</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-2 border border-white/20'
            >
              <Play className='w-5 h-5' />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className='grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-2xl mx-auto'
          >
            {[
              { number: '5000+', label: 'Verified Experts' },
              { number: '50K+', label: 'Happy Customers' },
              { number: '8+', label: 'Cities Covered' },
            ].map((stat, index) => (
              <div key={index} className='text-center'>
                <div className='text-2xl md:text-3xl font-bold text-white'>
                  {stat.number}
                </div>
                <div className='text-sm md:text-base text-white/60'>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
      >
        <div className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-white/50 rounded-full mt-2'></div>
        </div>
      </motion.div>
    </motion.section>
  );
};
