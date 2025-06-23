import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, MapPin, Tag } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useMallStore } from '../../store/mallStore';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { searchQuery, setSearchQuery } = useMallStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SuperMall</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shops" className="text-gray-700 hover:text-blue-600 transition-colors">
              Shops
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Link to="/offers" className="text-gray-700 hover:text-blue-600 transition-colors">
              Offers
            </Link>
            <Link to="/location" className="text-gray-700 hover:text-blue-600 transition-colors">
              Mall Map
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, shops..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </form>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-blue-600"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, shops..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t bg-white">
            <div className="flex flex-col space-y-3">
              <Link
                to="/shops"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Shops</span>
              </Link>
              <Link
                to="/products"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <Tag className="w-5 h-5" />
                <span>Products</span>
              </Link>
              <Link
                to="/offers"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <Tag className="w-5 h-5" />
                <span>Offers</span>
              </Link>
              <Link
                to="/location"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin className="w-5 h-5" />
                <span>Mall Map</span>
              </Link>
              
              <div className="border-t pt-3">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 mb-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>{user.name}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-gray-700 hover:text-blue-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block text-gray-700 hover:text-blue-600 mb-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}