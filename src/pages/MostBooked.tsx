import React from 'react';

const servicesData = [
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

function MostBooked() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-left">
        Most Popular Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service: Service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.name}</h3>
              <div className="flex items-center mb-2">
                <span className="text-lg font-bold text-blue-600">₹{service.price}</span>
                <span className="text-sm text-gray-500 line-through ml-2">₹{service.originalPrice}</span>
                <span className="text-xs text-green-600 ml-2">
                  ({Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}% off)
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Location: {service.location}</p>
              <p className="text-sm text-gray-600 mb-2">
                Status:{' '}
                <span className={service.available ? 'text-green-600' : 'text-red-600'}>
                  {service.available ? 'Available' : 'Booked'}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-2">Provider: {service.provider}</p>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MostBooked;