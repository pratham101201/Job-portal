import React, { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';

const AdminJobs: React.FC = () => {
  const token = localStorage.getItem('token');
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all jobs (including inactive if you want)
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://lucky-determination-production.up.railway.app/api/jobs?limit=100', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch jobs');
      setJobs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  // Soft delete a job (set isActive to false)
  const handleDelete = async (jobId: string) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://lucky-determination-production.up.railway.app/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete job');
      fetchJobs(); // Refresh list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">All Jobs</h1>
      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr>
              <th className="px-2 py-1 border">Title</th>
              <th className="px-2 py-1 border">Company</th>
              <th className="px-2 py-1 border">Location</th>
              <th className="px-2 py-1 border">Category</th>
              <th className="px-2 py-1 border">Status</th>
              <th className="px-2 py-1 border">Created At</th>
              <th className="px-2 py-1 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td className="px-2 py-1 border">{job.title}</td>
                <td className="px-2 py-1 border">{job.company}</td>
                <td className="px-2 py-1 border">{job.location}</td>
                <td className="px-2 py-1 border">{job.category}</td>
                <td className="px-2 py-1 border">
                  {job.isActive ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Inactive</span>
                  )}
                </td>
                <td className="px-2 py-1 border">
                  {job.createdAt ? new Date(job.createdAt).toLocaleString() : '-'}
                </td>
                <td className="px-2 py-1 border">
                  {/* You can add Edit/View buttons here */}
                  {job.isActive && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDelete(job.id)}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {jobs.length === 0 && !loading && (
          <p className="text-neutral-500 mt-4">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;