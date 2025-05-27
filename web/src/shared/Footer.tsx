import { Wrench } from "lucide-react";

export const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center space-x-2 mb-4'>
              <div className='w-8 h-8 bg-[#384bf6] rounded-lg flex items-center justify-center'>
                <Wrench className='w-5 h-5 text-white' />
              </div>
              <span className='text-xl font-bold'>M3allem</span>
            </div>
            <p className='text-gray-400'>
              Connecting you with trusted home service professionals across
              Morocco.
            </p>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Services</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>Electrical Work</li>
              <li>Plumbing</li>
              <li>Home Repairs</li>
              <li>Beauty Services</li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Company</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>About Us</li>
              <li>How it Works</li>
              <li>Contact</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Legal</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; 2025 M3allem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
