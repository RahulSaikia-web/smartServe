import React from 'react';
import { motion } from 'framer-motion';

interface Service {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  rating: number;
  location: string;
  available: boolean;
  provider: string;
}

const servicesData: Service[] = [
  {
    id: 1,
    name: 'AC Service',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1658402794135-faf080.png',
    description: 'Professional AC servicing including cleaning, gas refill, and maintenance for optimal cooling.',
    price: 799,
    originalPrice: 999,
    duration: '1-2 hours',
    rating: 4.5,
    location: 'Mumbai',
    available: true,
    provider: 'CoolTech Services',
  },
  {
    id: 2,
    name: 'Salon',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1681711961404-75dfec.jpeg',
    description: 'Premium salon services including haircuts, coloring, and spa treatments at your doorstep.',
    price: 599,
    originalPrice: 799,
    duration: '45-90 minutes',
    rating: 4.7,
    location: 'Delhi',
    available: true,
    provider: 'Glamour Hub',
  },
  {
    id: 3,
    name: 'Cleaning',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1741326936056-c3a39a.jpeg',
    description: 'Deep home cleaning services for kitchens, bathrooms, and living spaces.',
    price: 999,
    originalPrice: 1299,
    duration: '2-3 hours',
    rating: 4.3,
    location: 'Bangalore',
    available: false,
    provider: 'CleanSweep Solutions',
  },
  {
    id: 4,
    name: 'Plumbing',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1741326936056-c3a39a.jpeg',
    description: 'Expert plumbing solutions for leaks, installations, and pipe repairs.',
    price: 499,
    originalPrice: 699,
    duration: '1-2 hours',
    rating: 4.4,
    location: 'Hyderabad',
    available: true,
    provider: 'PipeFix Pros',
  },
  {
    id: 5,
    name: 'Electrician',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1710241114433-5cfa7c.jpeg',
    description: 'Reliable electrical services for wiring, repairs, and appliance installations.',
    price: 699,
    originalPrice: 899,
    duration: '1-3 hours',
    rating: 4.6,
    location: 'Chennai',
    available: true,
    provider: 'SparkSafe Electricians',
  },
  {
    id: 6,
    name: 'Carpentry',
    image:
      'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg',
    description: 'Custom carpentry services for furniture repairs and installations.',
    price: 899,
    originalPrice: 1099,
    duration: '2-4 hours',
    rating: 4.2,
    location: 'Pune',
    available: false,
    provider: 'WoodCraft Experts',
  },
];

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {service.rating} ★
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">₹{service.price}</span>
          <span className="text-sm text-gray-400 line-through ml-2">₹{service.originalPrice}</span>
          <span className="text-xs text-green-600 ml-2">
            ({Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}% off)
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">Location: <span className="font-medium">{service.location}</span></p>
          <p className="text-sm text-gray-600">
            Status: <span className={service.available ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
              {service.available ? 'Available' : 'Booked'}
            </span>
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-4">Provider: <span className="font-medium">{service.provider}</span></p>
        <motion.button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-blue-800 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Book Now
        </motion.button>
      </div>
    </motion.div>
  );
};

const MostBooked: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <motion.h2
        className="text-4xl font-extrabold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Most Popular Services
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default MostBooked;