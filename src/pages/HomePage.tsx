import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, User, Building2, PanelRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useJobsStore } from '../lib/store';
import { getJobs } from '../lib/firebase';
import JobCard from '../components/jobs/JobCard';
import JobSearch, { JobSearchFilters } from '../components/jobs/JobSearch';
import { useAuthStore } from '../lib/store';

const HomePage: React.FC = () => {
  const { featuredJobs, setFeaturedJobs, setIsLoading, setError } = useJobsStore();
  const [stats, setStats] = useState({
    jobs: 1500,
    companies: 500,
    candidates: 5000
  });
  const user = useAuthStore((state) => state.user);
  const role = user?.role;

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        setIsLoading(true);
        // In a real app, you'd use a filter parameter to get featured jobs
        // For now, just get the most recent 3 jobs
        const jobs = await getJobs();
        setFeaturedJobs(jobs.slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured jobs:', error);
        setError('Failed to load featured jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, [setFeaturedJobs, setIsLoading, setError]);

  const handleSearch = (filters: JobSearchFilters) => {
    // Navigate to the jobs page with the search filters
    window.location.href = `/jobs?keyword=${filters.keyword || ''}&location=${filters.location || ''}&category=${filters.category || ''}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in">
              Find Your Dream Job Today
            </h1>
            <p className="text-lg md:text-xl text-white/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Connect with top employers and discover opportunities that match your skills and aspirations.
            </p>
            <div className="bg-white rounded-lg p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <JobSearch onSearch={handleSearch} />
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>{stats.jobs.toLocaleString()}+ Jobs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>{stats.companies.toLocaleString()}+ Companies</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{stats.candidates.toLocaleString()}+ Candidates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-3">Featured Jobs</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Explore our handpicked selection of top opportunities from leading companies
            </p>
          </div>

          {featuredJobs.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} featured={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-500">Loading featured jobs...</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/jobs">
              <Button size="lg" className="px-8">
                View All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works & CTA Sections: Only show if NOT logged in */}
      {!role && (
        <>
          {/* How It Works Section */}
          <section className="py-16 bg-white">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-800 mb-3">How It Works</h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Our platform makes it easy to find the perfect job or the ideal candidate
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Job Seekers */}
                <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Search className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">For Job Seekers</h3>
                  <ul className="space-y-3 text-neutral-600 text-left">
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">1.</span>
                      <span>Create your profile and upload your resume</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">2.</span>
                      <span>Search and filter jobs that match your skills</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">3.</span>
                      <span>Apply with one click and track your applications</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/jobs">
                      <Button variant="outline" className="w-full">Find Jobs</Button>
                    </Link>
                  </div>
                </div>
                {/* Employers */}
                <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">For Employers</h3>
                  <ul className="space-y-3 text-neutral-600 text-left">
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary">1.</span>
                      <span>Create your company profile with all details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary">2.</span>
                      <span>Post detailed job listings with requirements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary">3.</span>
                      <span>Review applications and contact candidates</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/jobs/new">
                      <Button variant="outline" className="w-full">Post a Job</Button>
                    </Link>
                  </div>
                </div>
                {/* Administrators */}
                <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <PanelRight className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">For Administrators</h3>
                  <ul className="space-y-3 text-neutral-600 text-left">
                    <li className="flex items-start">
                      <span className="mr-2 text-accent">1.</span>
                      <span>Manage all users, jobs, and applications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-accent">2.</span>
                      <span>Monitor platform activity and performance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-accent">3.</span>
                      <span>Ensure compliance and maintain quality standards</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/admin">
                      <Button variant="outline" className="w-full">Go to Admin Panel</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-secondary text-white">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl font-bold">Ready to Take the Next Step?</h2>
                <p className="text-white/90 text-lg">
                  Join thousands of professionals and hundreds of companies already using our platform.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-secondary hover:bg-neutral-100">
                      Sign Up Now
                    </Button>
                  </Link>
                  <Link to="/jobs">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Browse Jobs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;