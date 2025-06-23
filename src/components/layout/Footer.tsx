import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">SuperMall</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Your premier shopping destination with over 200 stores, restaurants, and entertainment options.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <MapPin className="w-4 h-4" />
              <span>123 Mall Street, City Center</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shops" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Browse Shops
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Current Offers
                </Link>
              </li>
              <li>
                <Link to="/location" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Mall Directory
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Events & News
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Lost & Found
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact & Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">+1 (555) 123-MALL</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">info@supermall.com</span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <Clock className="w-4 h-4 text-blue-400 mt-0.5" />
                <div className="text-gray-300">
                  <div>Mon-Thu: 10am-9pm</div>
                  <div>Fri-Sat: 10am-10pm</div>
                  <div>Sunday: 11am-8pm</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 SuperMall. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}