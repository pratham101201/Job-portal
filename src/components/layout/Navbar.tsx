import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Briefcase as BriefcaseBusiness } from 'lucide-react';
import { useAuthStore } from '../../lib/store';
import { signOut } from '../../lib/firebase';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Firebase sign out (if used)
      await signOut();
      // Remove token from localStorage
      localStorage.removeItem('token');
      // Clear user from Zustand store
      useAuthStore.getState().setUser(null);
      // Redirect to home
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <BriefcaseBusiness className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-neutral-800">JobConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-neutral-600 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/jobs" className="text-neutral-600 hover:text-primary transition-colors">
            Find Jobs
          </Link>
          {user?.role === 'employer' && (
            <Link to="/employer/dashboard" className="text-neutral-600 hover:text-primary transition-colors">
              Post Jobs
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="text-neutral-600 hover:text-primary transition-colors">
              Admin
            </Link>
          )}
        </nav>

        {/* Authentication Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to={`/${user.role}/profile`} className="flex items-center space-x-2 text-neutral-600 hover:text-primary">
                <User className="w-5 h-5" />
                <span>{user.displayName}</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center space-x-1 text-neutral-600"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-neutral-600 hover:bg-neutral-100"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 animate-fade-in">
          <div className="container py-4 space-y-4">
            <Link
              to="/"
              className="block py-2 text-neutral-600 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="block py-2 text-neutral-600 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Jobs
            </Link>
            {user?.role === 'employer' && (
              <Link
                to="/employer/dashboard"
                className="block py-2 text-neutral-600 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Post Jobs
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="block py-2 text-neutral-600 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            <div className="pt-4 border-t border-neutral-200">
              {user ? (
                <div className="space-y-3">
                  <Link
                    to={`/${user.role}/profile`}
                    className="flex items-center space-x-2 py-2 text-neutral-600 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>{user.displayName}</span>
                  </Link>
                  <button
                    className="flex items-center space-x-2 py-2 text-neutral-600 hover:text-primary"
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/login"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link
                    to="/register"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;