import React, { useEffect, useState, ChangeEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  CalendarDays,
  Share2,
  Heart,
  Send
} from 'lucide-react';
import { getJob, applyForJob } from '../../lib/firebase';
import { useJobsStore, useAuthStore } from '../../lib/store';
import Button from '../../components/ui/Button';
import { Job } from '../../lib/types';
import { formatCurrency, formatDate, capitalizeFirstLetter } from '../../lib/utils';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedJob, setSelectedJob, setIsLoading, setError } = useJobsStore();
  const { user } = useAuthStore();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const [coverLetter, setCoverLetter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const jobData = await getJob(id);
        setSelectedJob(jobData as Job);
      } catch (error: any) {
        console.error('Error fetching job details:', error);
        setError(error.message || 'Failed to load job details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();

    // Cleanup
    return () => {
      setSelectedJob(null);
    };
  }, [id, setSelectedJob, setIsLoading, setError]);



  const handleCoverLetterChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCoverLetter(e.target.value);
  };

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!selectedJob) return;

    try {
      setIsApplying(true);

      // Prepare form data for multipart/form-data
      const formData = new FormData();
      formData.append('jobId', selectedJob.id);

      formData.append('coverLetter', coverLetter); // <-- Add this line

      const token = localStorage.getItem('token');
      const response = await fetch('https://lucky-determination-production.up.railway.app/api/applications', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token || ''}`,
          // Do NOT set Content-Type here; browser will set it with boundary
        },
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit application');
      }

      setApplicationSuccess(true);
    } catch (error) {
      console.error('Error applying for job:', error);
      setError('Failed to submit application');
    } finally {
      setIsApplying(false);
    }
  };

  if (!selectedJob) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center h-64">
          <p className="text-neutral-500">Loading job details...</p>
        </div>
      </div>
    );
  }

  const {
    title,
    company,
    location,
    description,
    requirements,
    jobType,
    salary,
    createdAt,
    applications
  } = selectedJob;

  const isJobSeeker = user?.role === 'jobseeker';
  const isEmployer = user?.role === 'employer';
  const isAdmin = user?.role === 'admin';
  const hasApplied = user?.role === 'jobseeker' && (user as any).appliedJobs?.includes(selectedJob.id);

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border border-neutral-200 p-6 mb-8">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">{title}</h1>
                  <div className="flex items-center text-neutral-600 mb-4">
                    <Building2 className="w-5 h-5 mr-2" />
                    <span className="font-medium">{company}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="btn btn-ghost text-neutral-600">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                  <button className="btn btn-ghost text-neutral-600">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center p-3 bg-neutral-50 rounded-md">
                  <MapPin className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <p className="text-xs text-neutral-500">Location</p>
                    <p className="font-medium">{location}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-neutral-50 rounded-md">
                  <Briefcase className="w-5 h-5 text-secondary mr-3" />
                  <div>
                    <p className="text-xs text-neutral-500">Job Type</p>
                    <p className="font-medium">{jobType
                      ? capitalizeFirstLetter(jobType.replace('-', ' '))
                      : 'N/A'}</p>
                  </div>
                </div>

                {salary && (
                  <div className="flex items-center p-3 bg-neutral-50 rounded-md">
                    <DollarSign className="w-5 h-5 text-accent mr-3" />
                    <div>
                      <p className="text-xs text-neutral-500">Salary</p>
                      <p className="font-medium">
                        {formatCurrency(salary)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center p-3 bg-neutral-50 rounded-md">
                  <CalendarDays className="w-5 h-5 text-success mr-3" />
                  <div>
                    <p className="text-xs text-neutral-500">Posted On</p>
                    <p className="font-medium">{formatDate(createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="text-neutral-700 space-y-4">
                <p>{description}</p>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                {(requirements || []).map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold mb-4">About {company}</h2>
            <p className="text-neutral-700 mb-4">
              This is a placeholder for company information. In a real application,
              this would show details about the company, their mission, culture, and benefits.
            </p>

            <div className="flex items-center mt-6">
              <Link to={`/company/${company.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary font-medium">
                View Company Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Application Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md border border-neutral-200 p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Job Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-neutral-700">
                <Building2 className="w-5 h-5 text-neutral-500 mr-3" />
                <span>{company}</span>
              </div>
              <div className="flex items-center text-neutral-700">
                <MapPin className="w-5 h-5 text-neutral-500 mr-3" />
                <span>{location}</span>
              </div>
              <div className="flex items-center text-neutral-700">
                <Briefcase className="w-5 h-5 text-neutral-500 mr-3" />
                <span> {jobType
                  ? capitalizeFirstLetter(jobType.replace('-', ' '))
                  : 'N/A'}</span>
              </div>
              {salary && (
                <div className="flex items-center text-neutral-700">
                  <DollarSign className="w-5 h-5 text-neutral-500 mr-3" />
                  <span>
                    {formatCurrency(salary)}
                  </span>
                </div>
              )}
              <div className="flex items-center text-neutral-700">
                <Clock className="w-5 h-5 text-neutral-500 mr-3" />
                <span>Posted {formatDate(createdAt)}</span>
              </div>
              <div className="flex items-center text-neutral-700">
                <Send className="w-5 h-5 text-neutral-500 mr-3" />
                <span>{applications.length} application(s)</span>
              </div>
            </div>

            {/* Application Actions */}
            <div className="space-y-3">
              {isJobSeeker && (
                <>
                  {hasApplied || applicationSuccess ? (
                    <div className="bg-success/10 border border-success/20 text-success p-4 rounded-md">
                      <p className="font-medium">Application Submitted</p>
                      <p className="text-sm mt-1">You've already applied to this job.</p>
                    </div>
                  ) : (
                    <form
                      className="space-y-4"
                      onSubmit={e => {
                        e.preventDefault();
                        handleApply();
                      }}
                    >

                      <div>
                        <label className="block text-sm font-medium mb-1">Cover Letter</label>
                        <textarea
                          className="input w-full min-h-[80px]"
                          placeholder="Write a short cover letter..."
                          value={coverLetter}
                          onChange={handleCoverLetterChange}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        isLoading={isApplying}
                      >
                        Apply Now
                      </Button>
                    </form>
                  )}
                </>
              )}

              {isEmployer && selectedJob.employerId === user?.id && (
                <Button
                  className="w-full"
                  onClick={() => navigate('/employer/applications')}
                >
                  View Applications
                </Button>
              )}

              {isAdmin && (
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    onClick={() => navigate('/admin/jobs')}
                  >
                    Manage Job
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/admin/users')}
                  >
                    View Employer
                  </Button>
                </div>
              )}

              {!user && (
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    onClick={() => navigate('/login?redirect=' + encodeURIComponent(window.location.pathname))}
                  >
                    Login to Apply
                  </Button>
                  <p className="text-center text-sm text-neutral-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary">
                      Sign up
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;