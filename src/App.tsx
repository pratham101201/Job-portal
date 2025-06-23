import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ShopsPage } from './pages/ShopsPage';
import { ShopDetailPage } from './pages/ShopDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { OffersPage } from './pages/OffersPage';
import { LocationPage } from './pages/LocationPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ShopOwnerDashboard } from './pages/shop-owner/ShopOwnerDashboard';
import { useAuthStore } from './store/authStore';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shops" element={<ShopsPage />} />
          <Route path="/shops/:id" element={<ShopDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {user?.role === 'admin' && (
            <Route path="/admin/*" element={<AdminDashboard />} />
          )}
          {user?.role === 'shop_owner' && (
            <Route path="/shop-owner/*" element={<ShopOwnerDashboard />} />
          )}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;