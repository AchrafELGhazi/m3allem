import { useState } from 'react';
import {
  Star,
  Shield,
  ArrowRight,
  Mail,
  Award,
  Zap,
  Users,
} from 'lucide-react';

const HeroSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#1a1f3a] via-[#2a2f4a] to-[#384bf6] relative overflow-hidden'>
      <div
        className='absolute inset-0 opacity-20'
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating Particles */}
      <div className='absolute inset-0'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute w-1 h-1 bg-white/20 rounded-full animate-pulse'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className='absolute top-20 right-20 w-64 h-64 bg-[#384bf6]/20 rounded-full blur-3xl'></div>
      <div className='absolute bottom-20 left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl'></div>

      <div className='container mx-auto px-5 pt-28 pb-16 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-8 items-center max-w-screen-xl mx-auto'>
          {/* Left Side - Content */}
          <div className='space-y-10 pl-5'>
            <div className='space-y-8'>
              <h1 className='text-4xl md:text-6xl font-bold text-white leading-tight'>
                Get <span className='text-[#384bf6]'>trusted</span> home
                services
                <span className='block bg-gradient-to-r from-white via-blue-100 to-[#384bf6] bg-clip-text text-transparent'>
                  save automatically
                </span>
                <span className='block text-white/90'>
                  all your{' '}
                  <span className='relative'>
                    repairs
                    <div className='absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#384bf6] to-purple-500 rounded-full'></div>
                  </span>
                  .
                </span>
              </h1>

              <p className='text-lg text-white/70 max-w-lg leading-relaxed'>
                Connect with{' '}
                <span className='text-[#384bf6] font-semibold'>
                  verified craftsmen
                </span>{' '}
                for quick, reliable home repairs and installations. Powerful
                matching, instant booking, and quality guaranteed.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className='flex flex-col sm:flex-row gap-4 max-w-lg'>
              <div className='relative flex-1'>
                <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5' />
                <input
                  type='email'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#384bf6]/50 focus:border-[#384bf6]/50 transition-all'
                  required
                />
              </div>
              <button
                type='submit'
                onClick={handleSubmit}
                className='bg-gradient-to-r from-[#384bf6] to-[#5865f2] hover:from-[#2f3db8] hover:to-[#4752c4] text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-[#384bf6]/25 transition-all hover:scale-105 hover:shadow-xl'
              >
                <span>Get Started</span>
                <ArrowRight className='w-5 h-5' />
              </button>
            </div>

            {/* Enhanced Feature Tags */}
            <div className='grid grid-cols-2 gap-4'>
              {[
                {
                  icon: Shield,
                  text: 'Verified Experts',
                  highlight: 'Verified',
                  color: 'from-green-400 to-emerald-500',
                  bgColor: 'bg-green-500/10',
                },
                {
                  icon: Zap,
                  text: 'Same Day Service',
                  highlight: 'Same Day',
                  color: 'from-yellow-400 to-orange-500',
                  bgColor: 'bg-yellow-500/10',
                },
                {
                  icon: Award,
                  text: '4.9★ Rating',
                  highlight: '4.9★',
                  color: 'from-purple-400 to-pink-500',
                  bgColor: 'bg-purple-500/10',
                },
                {
                  icon: Users,
                  text: 'All Morocco',
                  highlight: 'All',
                  color: 'from-blue-400 to-cyan-500',
                  bgColor: 'bg-blue-500/10',
                },
              ].map(
                ({ icon: Icon, text, highlight, color, bgColor }, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 ${bgColor} backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/10 hover:border-white/20 transition-all cursor-pointer group hover:scale-105 hover:-translate-y-1`}
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <Icon className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <span className='text-white/90 font-medium text-sm'>
                        {text.split(highlight)[0]}
                        <span
                          className={`bg-gradient-to-r ${color} bg-clip-text text-transparent font-bold`}
                        >
                          {highlight}
                        </span>
                        {text.split(highlight)[1]}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Side - Phone Frame */}
          <div className='relative flex justify-end pr-5'>
            <div className='relative'>
              {/* Phone Frame - Just borders with screenshot inside */}
              <div className='w-72 h-[580px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl'>
                {/* Inner phone screen area - ready for screenshot */}
                <div className='w-full h-full bg-gray-100 rounded-[2.5rem] overflow-hidden relative flex items-center justify-center'>
                  {/* Placeholder for app screenshot */}
                  <div className='text-gray-500 text-center p-8'>
                    {/* Ready for your app screenshot */}
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Elements - Smaller for phone context */}
              <div className='absolute -top-6 -right-6 w-14 h-14 bg-gradient-to-r from-[#384bf6] to-purple-500 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl animate-bounce'>
                <Star className='w-6 h-6 text-white' />
              </div>

              <div className='absolute -bottom-8 -left-8 w-18 h-10 bg-gradient-to-r from-emerald-400 to-green-500 backdrop-blur-xl rounded-xl border border-white/20 flex items-center justify-center shadow-2xl animate-pulse'>
                <div className='text-white font-bold text-sm'>4.9★</div>
              </div>

              <div className='absolute top-20 -left-4 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-xl animate-ping'>
                <Zap className='w-4 h-4 text-white' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
