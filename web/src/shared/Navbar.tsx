import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  Menu,
  X,
} from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 px-6 py-3 md:px-8 md:py-4'
    >
      <div className='flex items-center justify-between'>
        <motion.div
          className='flex items-center space-x-2 cursor-pointer'
          whileHover={{ scale: 1.05 }}
        >
          <div className='w-8 h-8 bg-[#384bf6] rounded-lg flex items-center justify-center'>
            <Wrench className='w-5 h-5 text-white' />
          </div>
          <span className='text-xl font-bold text-white'>M3allem</span>
        </motion.div>

        <div className='hidden md:flex items-center space-x-8'>
          {['Home', 'Services', 'How it Works', 'About', 'Contact'].map(
            item => (
              <motion.button
                key={item}
                className='text-white/80 hover:text-white transition-colors'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.button>
            )
          )}
        </div>

        <button
          className='md:hidden text-white'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>
      </div>
    </motion.nav>
  );
};
