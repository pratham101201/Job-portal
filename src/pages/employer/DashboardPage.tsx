import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { useAuthStore } from '../../lib/store';

const EmployerDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const token = localStorage.getItem('token');
  const [jobCount, setJobCount] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [newApplications, setNewApplications] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch jobs posted by this employer
        const jobsRes = await fetch(`https://lucky-determination-production.up.railway.app/api/jobs?limit=1000`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const jobs = await jobsRes.json();
        // Filter jobs by employerId
        const employerJobs = Array.isArray(jobs)
          ? jobs.filter((job: any) => job.employerId === user?.id && job.isActive)
          : [];
        setJobCount(employerJobs.length);

        // Fetch applications for employer's jobs
        let allApplications: any[] = [];
        for (const job of employerJobs) {
          const appsRes = await fetch(
            `http://localhost:5000/api/applications?jobId=${job.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const apps = await appsRes.json();
          if (Array.isArray(apps)) {
            allApplications = allApplications.concat(apps);
          }
        }
        setTotalApplications(allApplications.length);
        setNewApplications(allApplications.filter((a) => a.status === 'pending').length);
      } catch (e) {
        setJobCount(0);
        setTotalApplications(0);
        setNewApplications(0);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) fetchStats();
  }, [user, token]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Employer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Active Jobs</h3>
          <p className="text-3xl font-bold text-primary">
            {loading ? '...' : jobCount}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Applications</h3>
          <p className="text-3xl font-bold text-secondary">
            {loading ? '...' : totalApplications}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">New Applications</h3>
          <p className="text-3xl font-bold text-accent">
            {loading ? '...' : newApplications}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default EmployerDashboard;