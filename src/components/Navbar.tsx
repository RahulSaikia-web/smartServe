import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Search, Star, Phone, HelpCircle, BookOpen, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const placeholders: string[] = [
  'Search for services...',
  'Find your needs...',
  'What are you looking for?',
];

const servicesData = [
  {
    id: 1,
    name: 'AC Service',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1658402794135-faf080.png',
    description: 'Professional AC servicing including cleaning, gas refill, and maintenance for optimal cooling.',
    price: '₹799',
    duration: '1-2 hours',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Salon',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1681711961404-75dfec.jpeg',
    description: 'Premium salon services including haircuts, coloring, and spa treatments at your doorstep.',
    price: '₹599',
    duration: '45-90 minutes',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Cleaning',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1741326936056-c3a39a.jpeg',
    description: 'Deep home cleaning services for kitchens, bathrooms, and living spaces.',
    price: '₹999',
    duration: '2-3 hours',
    rating: 4.3,
  },
  {
    id: 4,
    name: 'Plumbing',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1741326936056-c3a39a.jpeg',
    description: 'Expert plumbing solutions for leaks, installations, and pipe repairs.',
    price: '₹499',
    duration: '1-2 hours',
    rating: 4.4,
  },
  {
    id: 5,
    name: 'Electrician',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1710241114433-5cfa7c.jpeg',
    description: 'Reliable electrical services for wiring, repairs, and appliance installations.',
    price: '₹699',
    duration: '1-3 hours',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Carpentry',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg',
    description: 'Custom carpentry services for furniture repairs and installations.',
    price: '₹899',
    duration: '2-4 hours',
    rating: 4.2,
  },
];

interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  rating: number;
}

const LoginModal: React.FC<{ isOpen: boolean; onClose: () => void; onLogin: () => void }> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [error, setError] = useState('');
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setError('');
    setStep('otp');
    console.log('Sending OTP to:', phoneNumber);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      otpInputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (!/^\d{6}$/.test(otpValue)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    setError('');
    console.log('Verifying OTP:', otpValue);
    onLogin();
    alert('Login successful!');
    onClose();
    setPhoneNumber('');
    setOtp(['', '', '', '', '', '']);
    setStep('phone');
  };

  const handleClose = () => {
    setPhoneNumber('');
    setOtp(['', '', '', '', '', '']);
    setError('');
    setStep('phone');
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white w-full max-w-[90%] sm:max-w-md rounded-2xl p-4 sm:p-6 transform transition-all duration-300 ${
          isOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'
        } shadow-xl mx-4 sm:mx-0`}
      >
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-100 transition"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
            <Phone className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
            {step === 'phone' ? 'Enter your phone number' : 'Enter OTP'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base text-center mb-4 sm:mb-6 px-2">
            {step === 'phone'
              ? 'We’ll send you a text with a verification code'
              : 'Enter the 6-digit code sent to your phone'}
          </p>
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="w-full">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter 10-digit phone number"
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 mb-3 sm:mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm sm:text-base"
                aria-label="Phone number"
              />
              {error && <p className="text-red-500 text-xs sm:text-sm mb-3 sm:mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-2 sm:py-3 font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="w-full">
              <div className="flex justify-center space-x-1 sm:space-x-2 mb-3 sm:mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    maxLength={1}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    className="w-8 h-8 sm:w-10 sm:h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-base sm:text-lg"
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-xs sm:text-sm mb-3 sm:mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-2 sm:py-3 font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [placeholder, setPlaceholder] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState<boolean>(false);
  const [isMobileProfileDropdownOpen, setIsMobileProfileDropdownOpen] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setServices(servicesData);
  }, []);

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

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredServices([]);
      return;
    }

    const filtered = services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchQuery, services]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredServices([]);
    setIsSearchFocused(false);
  };

  const handleProfileClick = (isMobile: boolean) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      if (isMobile) {
        setIsMobileProfileDropdownOpen(!isMobileProfileDropdownOpen);
      } else {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
      }
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileDropdownOpen(false);
    setIsMobileProfileDropdownOpen(false);
    console.log('User logged out');
  };

  return (
    <div className="relative">
      <nav
        className={`w-full bg-white shadow-lg py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between fixed top-0 z-50 transition-all duration-300 ${
          menuOpen ? 'blur-sm' : ''
        }`}
      >
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-8 sm:h-10 object-contain"
          />
        </div>
        <div
          className="hidden md:flex w-full max-w-xs sm:max-w-md mx-4 relative"
          ref={searchContainerRef}
        >
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            className="w-full border border-gray-200 rounded-full px-4 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-600 placeholder-gray-400 bg-gray-50 hover:bg-white text-sm sm:text-base"
            aria-label="Search services"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          {isSearchFocused && filteredServices.length > 0 && (
            <div
              className="absolute top-full left-0 mt-2 w-full bg-white shadow-2xl rounded-lg z-50 max-h-96 overflow-y-auto border border-gray-100"
              role="listbox"
            >
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredServices.map((service) => (
                    <Link
                      key={service.id}
                      to={`/booking/${service.id}`}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200"
                      role="option"
                      aria-label={`Book ${service.name}`}
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">
                          {service.name}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">{service.rating}</span>
                        </div>
                        <p className="text-sm font-semibold text-blue-600 mt-1">{service.price}</p>
                        <p className="text-xs text-gray-500 mt-1">{service.duration}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          {isSearchFocused && filteredServices.length === 0 && searchQuery && (
            <div
              className="absolute top-full left-0 mt-2 w-full bg-white shadow-2xl rounded-lg z-50 p-4 text-center"
              role="listbox"
            >
              <p className="text-sm text-gray-600">No services found</p>
            </div>
          )}
        </div>
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
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 relative">
          <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition">
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-medium text-sm sm:text-base">Cart</span>
          </button>
          <div className="relative">
            <button
              ref={profileButtonRef}
              onClick={() => handleProfileClick(false)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium text-sm sm:text-base">
                {isLoggedIn ? 'Profile' : 'Login'}
              </span>
            </button>
            {isLoggedIn && isProfileDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 animate-dropdown"
              >
                <Link
                  to="/help-center"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <HelpCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Help Center</span>
                </Link>
                <Link
                  to="/my-bookings"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">My Bookings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition text-left"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div
        className={`md:hidden fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-2xl transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img
            src={logo}
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
          <div className="relative" ref={searchContainerRef}>
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full border border-gray-200 rounded-full px-4 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-600 placeholder-gray-400 bg-gray-50 text-sm"
              aria-label="Search services"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
            {isSearchFocused && filteredServices.length > 0 && (
              <div
                className="absolute top-full left-0 mt-2 w-full bg-white shadow-2xl rounded-lg z-50 max-h-96 overflow-y-auto border border-gray-100"
                role="listbox"
              >
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Services</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {filteredServices.map((service) => (
                      <Link
                        key={service.id}
                        to={`/booking/${service.id}`}
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200"
                        role="option"
                        aria-label={`Book ${service.name}`}
                      >
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 line-clamp-1">
                            {service.name}
                          </p>
                          <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">{service.rating}</span>
                          </div>
                          <p className="text-sm font-semibold text-blue-600 mt-1">{service.price}</p>
                          <p className="text-xs text-gray-500 mt-1">{service.duration}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {isSearchFocused && filteredServices.length === 0 && searchQuery && (
              <div
                className="absolute top-full left-0 mt-2 w-full bg-white shadow-2xl rounded-lg z-50 p-4 text-center"
                role="listbox"
              >
                <p className="text-sm text-gray-600">No services found</p>
              </div>
            )}
          </div>
          <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition py-2">
            <ShoppingCart className="w-6 h-6" />
            <span className="text-lg font-medium">Cart</span>
          </button>
          <div className="relative">
            <button
              onClick={() => handleProfileClick(true)}
              className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition py-2 w-full"
            >
              <User className="w-6 h-6" />
              <span className="text-lg font-medium">{isLoggedIn ? 'Profile' : 'Login'}</span>
            </button>
            {isLoggedIn && isMobileProfileDropdownOpen && (
              <div
                className={`bg-gray-50 rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
                  isMobileProfileDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <Link
                  to="/help-center"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  onClick={() => {
                    setIsMobileProfileDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  <HelpCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Help Center</span>
                </Link>
                <Link
                  to="/my-bookings"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  onClick={() => {
                    setIsMobileProfileDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">My Bookings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition text-left"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
      <style>
        {`
          @keyframes dropdown {
            0% {
              opacity: 0;
              transform: translateY(-10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-dropdown {
            animation: dropdown 0.2s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;