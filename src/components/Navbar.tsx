import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const placeholders: string[] = [
  'Search for services...',
  'Find your needs...',
  'What are you looking for?',
];

// Provided services data with added IDs
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

const Navbar: React.FC = () => {
  const [placeholder, setPlaceholder] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Fetch services (using provided data, replace with API call if needed)
  useEffect(() => {
    setServices(servicesData);
  }, []);

  // Typing animation for placeholder
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

  // Filter services based on partial match (old search logic)
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

    // Debug: Log filtered results
    console.log('Search Query:', searchQuery);
    console.log('Filtered Services:', filtered);
  }, [searchQuery, services]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredServices([]);
    setIsSearchFocused(false);
  };

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

        {/* Search Bar (Desktop) */}
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
          {/* Search Results Dropdown (Desktop) */}
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
            {/* Search Results in Mobile Sidebar */}
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