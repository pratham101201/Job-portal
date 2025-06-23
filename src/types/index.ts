export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'shop_owner' | 'admin';
  avatar?: string;
  createdAt: Date;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  category: string;
  owner: User;
  location: ShopLocation;
  images: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  operatingHours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  createdAt: Date;
}

export interface ShopLocation {
  floor: number;
  section: string;
  unit: string;
  coordinates?: { x: number; y: number };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  shopId: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  tags: string[];
  specifications?: Record<string, string>;
  createdAt: Date;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  shopId: string;
  shop: Shop;
  type: 'discount' | 'bogo' | 'combo' | 'seasonal';
  discountPercent?: number;
  validFrom: Date;
  validTo: Date;
  image?: string;
  isActive: boolean;
  termsAndConditions: string[];
  applicableProducts?: string[];
  minimumPurchase?: number;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  user: User;
  shopId?: string;
  productId?: string;
  rating: number;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: Date;
}

export interface MallFloor {
  id: string;
  number: number;
  name: string;
  description: string;
  facilities: string[];
  sections: MallSection[];
}

export interface MallSection {
  id: string;
  name: string;
  type: 'shops' | 'food_court' | 'entertainment' | 'services' | 'parking';
  description: string;
  shops: Shop[];
}

export interface SearchFilters {
  category?: string;
  priceRange?: { min: number; max: number };
  location?: { floor?: number; section?: string };
  rating?: number;
  inStock?: boolean;
  hasOffers?: boolean;
}