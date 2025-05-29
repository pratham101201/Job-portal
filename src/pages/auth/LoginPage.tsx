import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuthStore } from '../../lib/store';
import {  signInWithCustomToken } from "firebase/auth";
import { auth } from '../../lib/firebase'; // Adjust the import based on your project structure
 // Make sure you export your firebase app instance

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('https://lucky-determination-production.up.railway.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to sign in');
      }

      // EXCHANGE CUSTOM TOKEN FOR ID TOKEN
      await signInWithCustomToken(auth, result.token);
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) {
  throw new Error('Failed to retrieve ID token');
}
      // Save ID token to localStorage for API requests
      localStorage.setItem('token', idToken);

      setUser({
        id: result.user.id,
        email: result.user.email,
        displayName: result.user.name,
        role: result.user.role,
        createdAt: result.user.createdAt,
      });

      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-neutral-600">
            Sign in to your account to continue
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md border border-neutral-200">
          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md text-error text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                label="Email address"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={errors.email?.message}
              />
            </div>
            
            <div>
              <Input
                label="Password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                error={errors.password?.message}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-600">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-primary hover:text-primary-dark">
                  Forgot your password?
                </Link>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full flex justify-center items-center"
              isLoading={isLoading}
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign in
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-neutral-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;