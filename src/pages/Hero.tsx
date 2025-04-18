import React, { useState, useEffect } from 'react';
import { Star, Users } from 'lucide-react';

const services = [
  {
    name: 'AC Service',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1658402794135-faf080.png',
    description: 'Professional AC servicing including cleaning, gas refill, and maintenance for optimal cooling.',
    price: '₹799',
    duration: '1-2 hours',
    rating: 4.5,
  },
  {
    name: 'Salon',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1681711961404-75dfec.jpeg',
    description: 'Premium salon services including haircuts, coloring, and spa treatments at your doorstep.',
    price: '₹599',
    duration: '45-90 minutes',
    rating: 4.7,
  },
  {
    name: 'Cleaning',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1741326936056-c3a39a.jpeg',
    description: 'Deep home cleaning services for kitchens, bathrooms, and living spaces.',
    price: '₹999',
    duration: '2-3 hours',
    rating: 4.3,
  },
  {
    name: 'Plumbing',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1741326936056-c3a39a.jpeg',
    description: 'Expert plumbing solutions for leaks, installations, and pipe repairs.',
    price: '₹499',
    duration: '1-2 hours',
    rating: 4.4,
  },
  {
    name: 'Electrician',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1710241114433-5cfa7c.jpeg',
    description: 'Reliable electrical services for wiring, repairs, and appliance installations.',
    price: '₹699',
    duration: '1-3 hours',
    rating: 4.6,
  },
  {
    name: 'Carpentry',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg',
    description: 'Custom carpentry services for furniture repairs and installations.',
    price: '₹899',
    duration: '2-4 hours',
    rating: 4.2,
  },
];

// Function to calculate rating and format customer count
const calculateRatingData = (customerCount: number) => {
  // Rating distribution
  const distribution = {
    5: 0.6, // 60% 5-star
    4: 0.25, // 25% 4-star
    3: 0.1, // 10% 3-star
    2: 0.03, // 3% 2-star
    1: 0.02, // 2% 1-star
  };

  // Calculate number of ratings per star
  const ratings = {
    5: Math.round(customerCount * distribution[5]),
    4: Math.round(customerCount * distribution[4]),
    3: Math.round(customerCount * distribution[3]),
    2: Math.round(customerCount * distribution[2]),
    1: Math.round(customerCount * distribution[1]),
  };

  // Calculate total ratings (should equal customerCount)
  const totalRatings = ratings[5] + ratings[4] + ratings[3] + ratings[2] + ratings[1];

  // Calculate sum of ratings
  const sumRatings =
    5 * ratings[5] +
    4 * ratings[4] +
    3 * ratings[3] +
    2 * ratings[2] +
    1 * ratings[1];

  // Calculate average rating
  const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : '0.0';

  // Format customer count
  const formattedCount =
    customerCount >= 1000000
      ? `${(customerCount / 1000000).toFixed(1)}M+`
      : customerCount >= 1000
      ? `${Math.round(customerCount / 1000)}K+`
      : `${customerCount}`;

  return {
    rating: averageRating,
    customerCount: formattedCount,
  };
};

const Hero: React.FC = () => {
  // State for dynamic customer count
  const [customerCount, setCustomerCount] = useState(20000); // Example: 20,000 customers

  // Calculate rating and formatted customer count
  const { rating, customerCount: formattedCount } = calculateRatingData(customerCount);

  // Data objects using calculated values
  const ratingData = {
    rating,
    label: 'Rating',
    icon: <Star className="w-8 h-8 text-yellow-400 fill-current" />,
  };

  const customerData = {
    count: formattedCount,
    label: 'Happy Customers',
    icon: <Users className="w-8 h-8 text-blue-500" />,
  };

  // Handle booking redirect
  const handleServiceClick = (serviceName: string) => {
    // Replace spaces with hyphens and convert to lowercase for URL-friendly format
    const formattedName = serviceName.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `/booking/${formattedName}`;
    // If using React Router, replace with:
    // navigate(`/booking/${formattedName}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between bg-gray-50 px-4 sm:px-6 lg:px-12 py-12 mt-16 md:mt-20">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-8 h-full">
        {/* Big Text */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
          Home services at your doorstep
        </h1>

        {/* Box with Small Boxes */}
        <div className="w-full max-w-lg border border-gray-200 rounded-lg p-6 bg-white shadow-md">
          <div className="grid grid-cols-3 gap- pandem4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-2 relative group cursor-pointer"
                onClick={() => handleServiceClick(service.name)}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-2"
                />
                <span className="text-sm sm:text-base text-gray-600 font-medium text-center">
                  {service.name}
                </span>
                {/* Animated Bottom Line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Rating and Customers */}
        <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8 w-full max-w-lg">
          {/* Rating */}
          <div className="flex items-center space-x-4">
            {ratingData.icon}
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-gray-700">{ratingData.rating}</span>
              <span className="text-sm text-gray-600">{ratingData.label}</span>
            </div>
          </div>
          {/* Customers */}
          <div className="flex items-center space-x-4">
            {customerData.icon}
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-gray-700">{customerData.count}</span>
              <span className="text-sm text-gray-600">{customerData.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center h-full mt-8 md:mt-0">
        <img
          src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1696852847761-574450.jpeg"
          alt="Hero Image"
          className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
};

export default Hero;