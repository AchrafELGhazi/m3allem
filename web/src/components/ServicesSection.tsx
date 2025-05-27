import { motion } from 'framer-motion';
import { Wrench, Zap, Home, Users } from 'lucide-react';

export const ServicesSection = () => {
  const services = [
    {
      icon: Zap,
      title: 'Electrical Work',
      desc: 'Professional electricians for all your electrical needs',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Wrench,
      title: 'Plumbing',
      desc: 'Expert plumbers for repairs and installations',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Home,
      title: 'Home Repairs',
      desc: 'Comprehensive home maintenance solutions',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: Users,
      title: 'Beauty Services',
      desc: 'Professional hairdressers and beauty experts',
      color: 'from-pink-400 to-rose-500',
    },
  ];

  return (
    <section id='services' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-5xl font-bold text-gray-900 mb-6'>
            Professional Services
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            From electrical work to beauty services, find verified professionals
            for all your needs
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              className='bg-white rounded-3xl p-6 md:p-8 border border-gray-100 hover:border-[#384bf6]/20 transition-all duration-300'
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}
              >
                <service.icon className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>
                {service.title}
              </h3>
              <p className='text-gray-600 leading-relaxed'>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
