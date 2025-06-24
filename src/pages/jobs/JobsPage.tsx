import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { getJobs } from '../../lib/firebase';
import { useJobsStore } from '../../lib/store';
import JobCard from '../../components/jobs/JobCard';
import JobSearch, { JobSearchFilters } from '../../components/jobs/JobSearch';
import Button from '../../components/ui/Button';
import { jobCategories, jobTypes } from '../../lib/utils';


const JobsPage: React.FC = () => {

  const location = useLocation();
  const { jobs, isLoading, error, setJobs, setIsLoading, setError } = useJobsStore();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<JobSearchFilters>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Parse URL query parameters on initial load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialFilters: JobSearchFilters = {
      keyword: searchParams.get('keyword') || undefined,
      location: searchParams.get('location') || undefined,
      category: searchParams.get('category') || undefined
    };

    setFilters(initialFilters);
    if (initialFilters.category) {
      setSelectedCategory(initialFilters.category);
    }

  }, [location.search]);

  // Fetch jobs with filters
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);

        // In a real app, you'd pass the filters to the getJobs function
        const fetchedJobs = await getJobs(filters);

        // Apply client-side filtering for the type (as an example)
        let filteredJobs = [...fetchedJobs];

        if (selectedType) {
          filteredJobs = filteredJobs.filter(job => job.type === selectedType);
        }

        // Apply sorting
        switch (sortBy) {
          case 'newest':
            filteredJobs.sort((a, b) => b.createdAt - a.createdAt);
            break;
          case 'oldest':
            filteredJobs.sort((a, b) => a.createdAt - b.createdAt);
            break;
          case 'alphabetical':
            filteredJobs.sort((a, b) => a.title.localeCompare(b.title));
            break;
          default:
            break;
        }

        setJobs(filteredJobs);
      } catch (error: any) {
        console.error('Error fetching jobs:', error);
        setError(error.message || 'Failed to load jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [filters, selectedType, sortBy, setJobs, setIsLoading, setError]);

  const handleSearch = (searchFilters: JobSearchFilters) => {
    setFilters({ ...filters, ...searchFilters });

    // Update URL with search parameters
    const searchParams = new URLSearchParams();
    if (searchFilters.keyword) searchParams.set('keyword', searchFilters.keyword);
    if (searchFilters.location) searchParams.set('location', searchFilters.location);
    if (searchFilters.category) searchParams.set('category', searchFilters.category);

    window.history.pushState({}, '', `${location.pathname}?${searchParams.toString()}`);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setFilters({ ...filters, category: e.target.value || undefined });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedType('');
    setSortBy('newest');
    setFilters({});
    window.history.pushState({}, '', location.pathname);
  };

  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-3xl font-bold text-neutral-800 mb-8">Find Your Perfect Job</h1>

        <div className="mb-8">
          <JobSearch onSearch={handleSearch} />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar - Desktop */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg flex items-center">
                  <Filter className="w-4 h-4 mr-2" /> Filters
                </h3>
                <button
                  className="text-xs text-primary hover:text-primary-dark"
                  onClick={clearAllFilters}
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-2 block">
                    Job Category
                  </label>
                  <select
                    className="input"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">All Categories</option>
                    {jobCategories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-2 block">
                    Job Type
                  </label>
                  <select
                    className="input"
                    value={selectedType}
                    onChange={handleTypeChange}
                  >
                    <option value="">All Types</option>
                    {jobTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-2 block">
                    Sort By
                  </label>
                  <select
                    className="input"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="alphabetical">A-Z</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs list */}
          <div className="flex-1">
            {/* Mobile filters toggle */}
            <div className="md:hidden mb-4 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>

              <div className="flex items-center">
                <ArrowUpDown className="w-4 h-4 mr-2 text-neutral-500" />
                <select
                  className="text-sm border-none bg-transparent"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="alphabetical">A-Z</option>
                </select>
              </div>
            </div>

            {/* Mobile filters */}
            {showFilters && (
              <div className="md:hidden bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-4 animate-slide-up">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-neutral-700 mb-2 block">
                      Job Category
                    </label>
                    <select
                      className="input"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      <option value="">All Categories</option>
                      {jobCategories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-neutral-700 mb-2 block">
                      Job Type
                    </label>
                    <select
                      className="input"
                      value={selectedType}
                      onChange={handleTypeChange}
                    >
                      <option value="">All Types</option>
                      {jobTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                    >
                      Clear all
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setShowFilters(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Jobs results */}
            <div className="mb-4 text-neutral-600">
              {isLoading ? (
                <p>Loading jobs...</p>
              ) : (
                <p>{jobs.length} jobs found</p>
              )}
            </div>

            {error && (
              <div className="bg-error/10 border border-error/20 text-error p-4 rounded-md mb-4">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-neutral-100 animate-pulse h-40 rounded-lg"></div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-neutral-500 mb-4">
                  Try adjusting your search criteria or check back later.
                </p>
                <Button onClick={clearAllFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;