import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const formatCurrency = (amount: number): string => {
  // Format number in Indian style (e.g., 1,20,000)
  if (typeof amount !== 'number') return '';
  return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

export const capitalizeFirstLetter = (string: string): string => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const getRelativeTimeString = (timestamp: number): string => {
  const now = Date.now();
  const diffInMs = now - timestamp;
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHour = Math.floor(diffInMin / 60);
  const diffInDay = Math.floor(diffInHour / 24);
  const diffInMonth = Math.floor(diffInDay / 30);
  const diffInYear = Math.floor(diffInDay / 365);

  if (diffInSec < 60) {
    return 'just now';
  } else if (diffInMin < 60) {
    return `${diffInMin} minute${diffInMin > 1 ? 's' : ''} ago`;
  } else if (diffInHour < 24) {
    return `${diffInHour} hour${diffInHour > 1 ? 's' : ''} ago`;
  } else if (diffInDay < 30) {
    return `${diffInDay} day${diffInDay > 1 ? 's' : ''} ago`;
  } else if (diffInMonth < 12) {
    return `${diffInMonth} month${diffInMonth > 1 ? 's' : ''} ago`;
  } else {
    return `${diffInYear} year${diffInYear > 1 ? 's' : ''} ago`;
  }
};

export const jobTypes = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' }
];

export const jobCategories = [
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'customer-service', label: 'Customer Service' },
  { value: 'administrative', label: 'Administrative' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' }
];

export const applicationStatuses = [
  { value: 'pending', label: 'Pending', color: 'bg-warning/20 text-warning' },
  { value: 'reviewing', label: 'Reviewing', color: 'bg-primary/20 text-primary' },
  { value: 'accepted', label: 'Accepted', color: 'bg-success/20 text-success' },
  { value: 'rejected', label: 'Rejected', color: 'bg-error/20 text-error' }
];

export const getStatusColor = (status: string): string => {
  const statusObject = applicationStatuses.find(s => s.value === status);
  return statusObject ? statusObject.color : 'bg-neutral-200 text-neutral-700';
};

export const fetchApplications = async (token: string) => {
  const response = await fetch('lucky-determination-production.up.railway.app/api/applications', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  console.log(result);
  if (!response.ok) throw new Error(result.message || 'Failed to fetch applications');
  return result;
};