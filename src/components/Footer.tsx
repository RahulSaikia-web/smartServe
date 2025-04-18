import React from 'react';
import logo from '../assets/favicon.png';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Copyright */}
          <div className="col-span-1 md:col-span-2">
            <img src={logo} alt="Smart Serve Logo" className="h-10 mb-6 object-contain" />
            <p className="text-sm text-gray-400">
              © Copyright 2025 Smart Serve Ltd. All rights reserved. | CIN: U74140DL2014PTC274413
            </p>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about-us" className="hover:text-white transition">
                  About us
                </a>
              </li>
              <li>
                <a href="/terms-conditions" className="hover:text-white transition">
                  Terms & conditions
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-white transition">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="/anti-discrimination" className="hover:text-white transition">
                  Anti-discrimination policy
                </a>
              </li>
              <li>
                <a href="/esg-impact" className="hover:text-white transition">
                  ESG Impact
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-white transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* For Customers Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Customers</h3>
            <ul className="space-y-2">
              <li>
                <a href="/reviews" className="hover:text-white transition">
                  UC Reviews
                </a>
              </li>
              <li>
                <a href="/categories" className="hover:text-white transition">
                  Categories near you
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-white transition">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* For Partners Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Partners</h3>
            <ul className="space-y-2">
              <li>
                <a href="/register-professional" className="hover:text-white transition">
                  Register as a professional
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white transition">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white transition">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white transition">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white transition">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;