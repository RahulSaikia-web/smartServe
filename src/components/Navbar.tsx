import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search } from 'lucide-react';

const placeholders: string[] = [
  'Search for services...',
  'Find your needs...',
  'What are you looking for?',
];

const Navbar: React.FC = () => {
  const [placeholder, setPlaceholder] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    const type = () => {
      const fullText = placeholders[currentIndex];

      if (!isDeleting) {
        currentText = fullText.substring(0, charIndex + 1);
        setPlaceholder(currentText);
        charIndex++;

        if (charIndex === fullText.length) {
          isDeleting = true;
          setTimeout(type, 1500);
        } else {
          setTimeout(type, 100);
        }
      } else {
        currentText = fullText.substring(0, charIndex - 1);
        setPlaceholder(currentText);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % placeholders.length;
          setTimeout(type, 500);
        } else {
          setTimeout(type, 50);
        }
      }
    };

    type();
    return () => clearTimeout();
  }, []);

  return (
    <div className="relative">
      {/* Backdrop for blur effect when sidebar is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Main Navbar */}
      <nav
        className={`w-full bg-white shadow-lg py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between fixed top-0 z-50 transition-all duration-300 ${
          menuOpen ? 'blur-sm' : ''
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_108,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1687285683825-e6cf23.jpeg"
            alt="Logo"
            className="h-8 sm:h-10 object-contain"
          />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex w-full max-w-xs sm:max-w-md mx-4 relative">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full border border-gray-200 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-600 placeholder-gray-400 bg-gray-50 hover:bg-white text-sm sm:text-base"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-8 h-8 flex flex-col justify-center items-center space-y-1.5">
              <span
                className={`w-8 h-0.5 bg-gray-700 transform transition duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`w-8 h-0.5 bg-gray-700 transition duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-8 h-0.5 bg-gray-700 transform transition duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition">
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-medium text-sm sm:text-base">Cart</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-medium text-sm sm:text-base">Profile</span>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-2xl transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img
            src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_108,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1687285683825-e6cf23.jpeg"
            alt="Logo"
            className="h-8 object-contain"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 text-2xl font-bold focus:outline-none"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <div className="flex flex-col p-6 space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder={placeholder}
              className="w-full border border-gray-200 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-600 placeholder-gray-400 bg-gray-50 text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition py-2">
            <ShoppingCart className="w-6 h-6" />
            <span className="text-lg font-medium">Cart</span>
          </button>
          <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition py-2">
            <User className="w-6 h-6" />
            <span className="text-lg font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;