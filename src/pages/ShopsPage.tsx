import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Filter, Grid, List } from 'lucide-react';
import { useMallStore } from '../store/mallStore';

export function ShopsPage() {
  const { shops, searchQuery, filters, setFilters } = useMallStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');

  const categories = [...new Set(shops.map(shop => shop.category))];
  const floors = [...new Set(shops.map(shop => shop.location.floor))].sort();

  const filteredShops = shops.filter(shop => {
    if (searchQuery && !shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !shop.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory && shop.category !== selectedCategory) return false;
    if (selectedFloor && shop.location.floor !== parseInt(selectedFloor)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Shops</h1>
          <p className="text-gray-600">Discover amazing stores and boutiques</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Floor Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Floor</h3>
                <select
                  value={selectedFloor}
                  onChange={(e) => setSelectedFloor(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Floors</option>
                  {floors.map(floor => (
                    <option key={floor} value={floor}>Floor {floor}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedFloor('');
                }}
                className="w-full text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                Showing {filteredShops.length} of {shops.length} shops
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Shops Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShops.map((shop) => (
                  <Link
                    key={shop.id}
                    to={`/shops/${shop.id}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={shop.images[0]}
                      alt={shop.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {shop.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {shop.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-gray-600">
                            {shop.rating} ({shop.reviewCount})
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>Floor {shop.location.floor}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredShops.map((shop) => (
                  <Link
                    key={shop.id}
                    to={`/shops/${shop.id}`}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow flex items-center space-x-4"
                  >
                    <img
                      src={shop.images[0]}
                      alt={shop.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {shop.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {shop.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-gray-600">
                              {shop.rating} ({shop.reviewCount})
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <MapPin className="w-4 h-4" />
                            <span>Floor {shop.location.floor}, Section {shop.location.section}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {filteredShops.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No shops found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}