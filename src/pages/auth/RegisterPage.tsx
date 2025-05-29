import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Building2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

import { useAuthStore } from '../../lib/store';


interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      role: 'jobseeker'
    }
  });

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('https://lucky-determination-production.up.railway.app/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to register');
      }

      // Save token to localStorage or your preferred storage
      localStorage.setItem('token', result.token);

      setUser({
        id: result.user.id,
        email: result.user.email,
        displayName: result.user.name,
        role: result.user.role,
        createdAt: result.user.createdAt,
      });

      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="mt-2 text-neutral-600">
            Join our platform to find jobs or hire talent
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
                label="Full name"
                type="text"
                {...register('name', { 
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
                error={errors.name?.message}
              />
            </div>
            
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
            
            <div>
              <Input
                label="Confirm Password"
                type="password"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                error={errors.confirmPassword?.message}
              />
            </div>
            
            <div>
  <label className="text-sm font-medium text-neutral-700 mb-2 block">
    I want to register as
  </label>
  <div className="grid grid-cols-3 gap-4 mt-2">
    {/* Job Seeker */}
    <label className={`
      cursor-pointer rounded-md border p-4 text-center transition-all
      ${watch('role') === 'jobseeker' 
        ? 'border-primary bg-primary/5 text-primary' 
        : 'border-neutral-200 hover:border-primary/50'
      }
    `}>
      <input
        type="radio"
        value="jobseeker"
        className="sr-only"
        {...register('role')}
      />
      <UserPlus className="mx-auto h-6 w-6 mb-2" />
      <span className="text-sm font-medium">Job Seeker</span>
    </label>
    {/* Employer */}
    <label className={`
      cursor-pointer rounded-md border p-4 text-center transition-all
      ${watch('role') === 'employer' 
        ? 'border-primary bg-primary/5 text-primary' 
        : 'border-neutral-200 hover:border-primary/50'
      }
    `}>
      <input
        type="radio"
        value="employer"
        className="sr-only"
        {...register('role')}
      />
      <Building2 className="mx-auto h-6 w-6 mb-2" />
      <span className="text-sm font-medium">Employer</span>
    </label>
    {/* Admin */}
    <label className={`
      cursor-pointer rounded-md border p-4 text-center transition-all
      ${watch('role') === 'admin' 
        ? 'border-primary bg-primary/5 text-primary' 
        : 'border-neutral-200 hover:border-primary/50'
      }
    `}>
      <input
        type="radio"
        value="admin"
        className="sr-only"
        {...register('role')}
      />
      <span className="mx-auto h-6 w-6 mb-2 flex items-center justify-center font-bold text-lg">A</span>
      <span className="text-sm font-medium">Admin</span>
    </label>
  </div>
</div>
            
            <Button
              type="submit"
              className="w-full flex justify-center items-center"
              isLoading={isLoading}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;