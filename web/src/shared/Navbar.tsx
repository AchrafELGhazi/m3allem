import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (page: any) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/10 backdrop-blur-lg'
          : 'bg-white/5 backdrop-blur-sm'
      } rounded-2xl border border-white/20 px-6 py-3 md:px-8 md:py-4`}
    >
      <div className='flex items-center justify-between'>
        <motion.div
          className='flex items-center space-x-2 cursor-pointer'
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNavigation('home')}
        >
          <div className='w-8 h-8 bg-[#384bf6] rounded-lg flex items-center justify-center'>
            <Wrench className='w-5 h-5 text-white' />
          </div>
          <span className='text-xl font-bold text-white'>M3allem</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-8'>
          {[
            { name: 'Home', id: 'home' },
            { name: 'Services', id: 'services' },
            { name: 'How it Works', id: 'how-it-works' },
            { name: 'About', id: 'about' },
            { name: 'Contact', id: 'contact' },
          ].map(item => (
            <motion.button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`transition-colors ${
                currentPage === item.id
                  ? 'text-white'
                  : 'text-white/80 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.button>
          ))}
          <motion.button
            onClick={() => handleNavigation('terms')}
            className={`transition-colors ${
              currentPage === 'terms'
                ? 'text-white'
                : 'text-white/80 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Terms
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-white'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className='md:hidden mt-4 pt-4 border-t border-white/20'
        >
          {[
            { name: 'Home', id: 'home' },
            { name: 'Services', id: 'services' },
            { name: 'How it Works', id: 'how-it-works' },
            { name: 'About', id: 'about' },
            { name: 'Contact', id: 'contact' },
            { name: 'Terms', id: 'terms' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`block py-2 w-full text-left transition-colors ${
                currentPage === item.id
                  ? 'text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item.name}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};
