import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Mail, Globe, Star } from 'lucide-react';
import { useMallStore } from '../store/mallStore';

export function ShopDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getShopById, getProductsByShop } = useMallStore();
  
  const shop = id ? getShopById(id) : null;
  const products = id ? getProductsByShop(id) : [];

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Shop Not Found</h1>
          <p className="text-gray-600 mb-6">The shop you're looking for doesn't exist.</p>
          <Link
            to="/shops"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Shops
          </Link>
        </div>
      </div>
    );
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/shops"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Shops
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Shop Images */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {shop.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${shop.name} ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Shop Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{shop.name}</h1>
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {shop.category}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold text-gray-900">{shop.rating}</span>
                  <span className="text-gray-600">({shop.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {shop.description}
              </p>

              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>
                  Floor {shop.location.floor}, Section {shop.location.section}, Unit {shop.location.unit}
                </span>
              </div>
            </div>

            {/* Products */}
            {products.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-blue-600">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <span className={`text-sm px-2 py-1 rounded ${
                            product.inStock 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{shop.contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{shop.contactInfo.email}</span>
                </div>
                {shop.contactInfo.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <a
                      href={shop.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Operating Hours</h3>
              <div className="space-y-2">
                {Object.entries(shop.operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-gray-700 capitalize">{day}</span>
                    <span className="text-gray-600">
                      {hours.closed ? 'Closed' : `${formatTime(hours.open)} - ${formatTime(hours.close)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Floor {shop.location.floor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Section {shop.location.section}</span>
                </div>
                <div className="text-sm text-gray-600">Unit {shop.location.unit}</div>
              </div>
              <Link
                to="/location"
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
              >
                View on Mall Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}