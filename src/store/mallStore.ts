import { create } from 'zustand';
import { Shop, Product, Offer, MallFloor, SearchFilters } from '../types';
import { mockShops, mockProducts, mockOffers, mockFloors } from '../data/mockData';

interface MallState {
  shops: Shop[];
  products: Product[];
  offers: Offer[];
  floors: MallFloor[];
  loading: boolean;
  searchQuery: string;
  filters: SearchFilters;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  getShopById: (id: string) => Shop | undefined;
  getProductById: (id: string) => Product | undefined;
  getOfferById: (id: string) => Offer | undefined;
  getShopsByCategory: (category: string) => Shop[];
  getProductsByShop: (shopId: string) => Product[];
  getActiveOffers: () => Offer[];
  searchProducts: (query: string, filters?: SearchFilters) => Product[];
  searchShops: (query: string, filters?: SearchFilters) => Shop[];
}

export const useMallStore = create<MallState>((set, get) => ({
  shops: mockShops,
  products: mockProducts,
  offers: mockOffers,
  floors: mockFloors,
  loading: false,
  searchQuery: '',
  filters: {},

  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setFilters: (filters) => set({ filters }),

  getShopById: (id) => get().shops.find(shop => shop.id === id),
  
  getProductById: (id) => get().products.find(product => product.id === id),
  
  getOfferById: (id) => get().offers.find(offer => offer.id === id),

  getShopsByCategory: (category) => 
    get().shops.filter(shop => shop.category === category),

  getProductsByShop: (shopId) => 
    get().products.filter(product => product.shopId === shopId),

  getActiveOffers: () => {
    const now = new Date();
    return get().offers.filter(offer => 
      offer.isActive && 
      offer.validFrom <= now && 
      offer.validTo >= now
    );
  },

  searchProducts: (query, filters = {}) => {
    const { products } = get();
    let filtered = products;

    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }

    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange!.min && 
        product.price <= filters.priceRange!.max
      );
    }

    if (filters.inStock !== undefined) {
      filtered = filtered.filter(product => product.inStock === filters.inStock);
    }

    return filtered;
  },

  searchShops: (query, filters = {}) => {
    const { shops } = get();
    let filtered = shops;

    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(shop =>
        shop.name.toLowerCase().includes(lowercaseQuery) ||
        shop.description.toLowerCase().includes(lowercaseQuery) ||
        shop.category.toLowerCase().includes(lowercaseQuery)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(shop => shop.category === filters.category);
    }

    if (filters.location?.floor) {
      filtered = filtered.filter(shop => shop.location.floor === filters.location!.floor);
    }

    if (filters.rating) {
      filtered = filtered.filter(shop => shop.rating >= filters.rating!);
    }

    return filtered;
  }
}));