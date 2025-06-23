import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, MapPin, Tag, Users, Sparkles, Clock } from 'lucide-react';
import { useMallStore } from '../store/mallStore';

export function HomePage() {
  const { shops, getActiveOffers } = useMallStore();
  const activeOffers = getActiveOffers();
  const featuredShops = shops.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">SuperMall</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover amazing shops, exclusive offers, and unforgettable experiences 
              all under one roof
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shops"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Browse Shops
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/offers"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
              >
                View Offers
                <Tag className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SuperMall?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience shopping like never before with our world-class facilities and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">200+ Premium Shops</h3>
              <p className="text-gray-600">
                From luxury brands to local favorites, discover an incredible variety of shops and boutiques
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Navigation</h3>
              <p className="text-gray-600">
                Interactive mall map and digital directory to help you find exactly what you're looking for
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Exclusive Offers</h3>
              <p className="text-gray-600">
                Get access to special discounts, seasonal sales, and member-only promotions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Shops */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Shops
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular and highly-rated stores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredShops.map((shop) => (
              <div key={shop.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={shop.images[0]}
                  alt={shop.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{shop.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                      {shop.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{shop.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600">
                        {shop.rating} ({shop.reviewCount} reviews)
                      </span>
                    </div>
                    <Link
                      to={`/shops/${shop.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Visit Shop →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shops"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              View All Shops
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Current Offers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Offers
            </h2>
            <p className="text-xl text-gray-600">
              Don't miss out on these amazing deals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeOffers.slice(0, 2).map((offer) => (
              <div key={offer.id} className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg overflow-hidden text-white">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Tag className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-wide">
                      {offer.type === 'discount' ? 'DISCOUNT' : 'SPECIAL OFFER'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                  <p className="mb-4 opacity-90">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-75">
                      Valid until {offer.validTo.toLocaleDateString()}
                    </span>
                    <Link
                      to={`/shops/${offer.shopId}`}
                      className="bg-white text-red-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/offers"
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center"
            >
              View All Offers
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">200+</div>
              <div className="text-gray-300">Shops & Restaurants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">5M+</div>
              <div className="text-gray-300">Annual Visitors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">3</div>
              <div className="text-gray-300">Floors of Shopping</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">1000+</div>
              <div className="text-gray-300">Parking Spaces</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers and discover your new favorite store today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Users className="mr-2 w-5 h-5" />
              Join SuperMall
            </Link>
            <Link
              to="/location"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors inline-flex items-center justify-center"
            >
              <MapPin className="mr-2 w-5 h-5" />
              Find Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}