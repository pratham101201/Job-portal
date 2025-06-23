import { Shop, Product, Offer, MallFloor, User } from '../types';

const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'shop_owner',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=150&h=150&fit=crop',
    createdAt: new Date('2023-01-15')
  },
  {
    id: 'user-2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'shop_owner',
    avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?w=150&h=150&fit=crop',
    createdAt: new Date('2023-02-20')
  }
];

export const mockShops: Shop[] = [
  {
    id: 'shop-1',
    name: 'Fashion Forward',
    description: 'Premium fashion clothing and accessories for the modern trendsetter',
    category: 'Fashion',
    owner: mockUsers[0],
    location: { floor: 1, section: 'A', unit: '101' },
    images: [
      'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?w=800&h=600&fit=crop'
    ],
    rating: 4.5,
    reviewCount: 128,
    isActive: true,
    contactInfo: {
      phone: '+1 (555) 123-4567',
      email: 'info@fashionforward.com',
      website: 'https://fashionforward.com'
    },
    operatingHours: {
      monday: { open: '10:00', close: '21:00' },
      tuesday: { open: '10:00', close: '21:00' },
      wednesday: { open: '10:00', close: '21:00' },
      thursday: { open: '10:00', close: '21:00' },
      friday: { open: '10:00', close: '22:00' },
      saturday: { open: '09:00', close: '22:00' },
      sunday: { open: '11:00', close: '20:00' }
    },
    createdAt: new Date('2023-01-15')
  },
  {
    id: 'shop-2',
    name: 'TechZone Electronics',
    description: 'Latest gadgets, smartphones, and electronic accessories',
    category: 'Electronics',
    owner: mockUsers[1],
    location: { floor: 2, section: 'B', unit: '205' },
    images: [
      'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?w=800&h=600&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 89,
    isActive: true,
    contactInfo: {
      phone: '+1 (555) 987-6543',
      email: 'support@techzone.com',
      website: 'https://techzone.com'
    },
    operatingHours: {
      monday: { open: '10:00', close: '20:00' },
      tuesday: { open: '10:00', close: '20:00' },
      wednesday: { open: '10:00', close: '20:00' },
      thursday: { open: '10:00', close: '20:00' },
      friday: { open: '10:00', close: '21:00' },
      saturday: { open: '09:00', close: '21:00' },
      sunday: { open: '11:00', close: '19:00' }
    },
    createdAt: new Date('2023-02-20')
  },
  {
    id: 'shop-3',
    name: 'Gourmet Delights',
    description: 'Fine dining restaurant with international cuisine',
    category: 'Food & Dining',
    owner: mockUsers[0],
    location: { floor: 3, section: 'C', unit: '301' },
    images: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?w=800&h=600&fit=crop'
    ],
    rating: 4.3,
    reviewCount: 156,
    isActive: true,
    contactInfo: {
      phone: '+1 (555) 456-7890',
      email: 'reservations@gourmetdelights.com'
    },
    operatingHours: {
      monday: { open: '11:00', close: '22:00' },
      tuesday: { open: '11:00', close: '22:00' },
      wednesday: { open: '11:00', close: '22:00' },
      thursday: { open: '11:00', close: '22:00' },
      friday: { open: '11:00', close: '23:00' },
      saturday: { open: '10:00', close: '23:00' },
      sunday: { open: '10:00', close: '21:00' }
    },
    createdAt: new Date('2023-03-10')
  }
];

export const mockProducts: Product[] = [
  {
    id: 'product-1',
    name: 'Designer Leather Jacket',
    description: 'Premium genuine leather jacket with modern cut and elegant finish',
    price: 299.99,
    originalPrice: 399.99,
    category: 'Clothing',
    shopId: 'shop-1',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?w=600&h=600&fit=crop',
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockQuantity: 15,
    tags: ['leather', 'jacket', 'premium', 'fashion'],
    specifications: {
      'Material': '100% Genuine Leather',
      'Color': 'Black',
      'Sizes': 'S, M, L, XL',
      'Care': 'Professional cleaning recommended'
    },
    createdAt: new Date('2023-04-01')
  },
  {
    id: 'product-2',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality noise-canceling headphones with 30-hour battery life',
    price: 199.99,
    category: 'Electronics',
    shopId: 'shop-2',
    images: [
      'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?w=600&h=600&fit=crop',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockQuantity: 25,
    tags: ['bluetooth', 'headphones', 'wireless', 'audio'],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Noise Cancellation': 'Active',
      'Weight': '250g'
    },
    createdAt: new Date('2023-04-05')
  },
  {
    id: 'product-3',
    name: 'Gourmet Pasta Set',
    description: 'Handmade pasta with truffle sauce and premium ingredients',
    price: 28.99,
    category: 'Food',
    shopId: 'shop-3',
    images: [
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=600&h=600&fit=crop',
      'https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockQuantity: 10,
    tags: ['pasta', 'gourmet', 'truffle', 'italian'],
    specifications: {
      'Serves': '2 people',
      'Preparation Time': '15 minutes',
      'Allergens': 'Contains gluten, dairy',
      'Origin': 'Made in Italy'
    },
    createdAt: new Date('2023-04-10')
  }
];

export const mockOffers: Offer[] = [
  {
    id: 'offer-1',
    title: '25% Off All Fashion Items',
    description: 'Get 25% off on all clothing and accessories. Limited time offer!',
    shopId: 'shop-1',
    shop: mockShops[0],
    type: 'discount',
    discountPercent: 25,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2024-12-31'),
    image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?w=800&h=400&fit=crop',
    isActive: true,
    termsAndConditions: [
      'Offer valid on all items except sale items',
      'Cannot be combined with other offers',
      'Valid until stocks last'
    ],
    minimumPurchase: 100,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'offer-2',
    title: 'Buy 2 Get 1 Free Electronics',
    description: 'Purchase any 2 electronic accessories and get the third one absolutely free!',
    shopId: 'shop-2',
    shop: mockShops[1],
    type: 'bogo',
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2024-06-30'),
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?w=800&h=400&fit=crop',
    isActive: true,
    termsAndConditions: [
      'Applicable on accessories only',
      'Lowest priced item will be free',
      'Valid on in-stock items only'
    ],
    createdAt: new Date('2024-01-15')
  }
];

export const mockFloors: MallFloor[] = [
  {
    id: 'floor-1',
    number: 1,
    name: 'Ground Floor',
    description: 'Fashion, Accessories, and Beauty',
    facilities: ['ATM', 'Information Desk', 'Customer Service', 'Parking Access'],
    sections: [
      {
        id: 'section-1a',
        name: 'Section A',
        type: 'shops',
        description: 'Premium Fashion Brands',
        shops: [mockShops[0]]
      }
    ]
  },
  {
    id: 'floor-2',
    number: 2,
    name: 'Second Floor',
    description: 'Electronics, Books, and Entertainment',
    facilities: ['Electronics Repair', 'Gaming Zone', 'Book Store'],
    sections: [
      {
        id: 'section-2b',
        name: 'Section B',
        type: 'shops',
        description: 'Electronics and Gadgets',
        shops: [mockShops[1]]
      }
    ]
  },
  {
    id: 'floor-3',
    number: 3,
    name: 'Third Floor',
    description: 'Food Court and Dining',
    facilities: ['Food Court', 'Family Dining', 'Kids Play Area'],
    sections: [
      {
        id: 'section-3c',
        name: 'Section C',
        type: 'food_court',
        description: 'Restaurants and Cafes',
        shops: [mockShops[2]]
      }
    ]
  }
];