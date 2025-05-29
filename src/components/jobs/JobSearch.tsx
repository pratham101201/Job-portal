import React, { useState } from 'react';
import { Search, MapPin, Briefcase, FilterX } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { jobCategories } from '../../lib/utils';

interface JobSearchProps {
  onSearch: (filters: JobSearchFilters) => void;
}

export interface JobSearchFilters {
  keyword?: string;
  location?: string;
  category?: string;
}

const JobSearch: React.FC<JobSearchProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ keyword, location, category });
  };

  const handleReset = () => {
    setKeyword('');
    setLocation('');
    setCategory('');
    onSearch({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-4 p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <Input
              type="text"
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="pl-10 text-neutral-800"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-neutral-400" />
            </div>
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 text-neutral-800"
            />
          </div>
          <div className="md:flex items-center gap-3 grid grid-cols-2 gap-2">
            <Button type="submit" className="flex-grow">
              Search Jobs
            </Button>
            <Button 
              type="button" 
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="border-t border-neutral-200 p-4 bg-neutral-50 animate-slide-up">
  <div className="flex flex-wrap items-center gap-4">
    <div className="w-full sm:w-auto sm:flex-1">
      <label className="text-sm font-medium text-neutral-700 mb-1 block">
        Category
      </label>
     <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="block w-full rounded border border-neutral-300 px-3 py-2 text-neutral-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
>
  <option value="">All Categories</option>
  {jobCategories.map((cat) => (
    <option key={cat.value} value={cat.value}>
      {cat.label}
    </option>
  ))}
</select>
    </div>
    <div className="flex gap-2 items-end w-full sm:w-auto">
      <Button 
        type="button" 
        variant="primary" 
        onClick={handleReset}
        className="flex items-center text-neutral-800 border border-neutral-300 bg-white hover:bg-neutral-100"
      >
        <FilterX className="w-4 h-4 mr-2" />
        Reset
      </Button>
      <Button type="submit" className="bg-primary text-white hover:bg-primary-dark">
        Apply Filters
      </Button>
    </div>
  </div>
</div>
        )}
      </form>
    </div>
  );
};

export default JobSearch;