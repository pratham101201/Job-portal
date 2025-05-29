import React, { useEffect, useState } from 'react';

import { Card } from '../../components/ui/Card';

const AdminDashboard: React.FC = () => {
  const token = localStorage.getItem('token');
  const [userCount, setUserCount] = useState<number>(0);
  const [jobCount, setJobCount] = useState<number>(0);
  const [applicationCount, setApplicationCount] = useState<number>(0);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        // Fetch all users
        const allUsersRes = await fetch('https://lucky-determination-production.up.railway.app/api/users?limit=10000', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allUsers = await allUsersRes.json();
        setUserCount(Array.isArray(allUsers) ? allUsers.length : 0);
        // Get 5 most recent users (assuming createdAt exists)
        setRecentUsers(
          Array.isArray(allUsers)
            ? allUsers
                .filter((u: any) => u.role !== 'deleted')
                .sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0))
                .slice(0, 5)
            : []
        );

        // Fetch jobs count
        const jobsRes = await fetch('https://lucky-determination-production.up.railway.app/api/jobs?limit=10000', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const jobsData = await jobsRes.json();
        setJobCount(Array.isArray(jobsData) ? jobsData.filter((j: any) => j.isActive).length : 0);

        // Fetch applications count
        const appsRes = await fetch('https://lucky-determination-production.up.railway.app/api/applications?limit=10000', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const appsData = await appsRes.json();
        setApplicationCount(Array.isArray(appsData) ? appsData.length : 0);

      } catch (e) {
        setUserCount(0);
        setJobCount(0);
        setApplicationCount(0);
        setRecentUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [token]);


  return (
    <div className="flex min-h-screen">
     

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-primary">
              {loading ? '...' : userCount}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Active Jobs</h3>
            <p className="text-3xl font-bold text-secondary">
              {loading ? '...' : jobCount}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Applications</h3>
            <p className="text-3xl font-bold text-accent">
              {loading ? '...' : applicationCount}
            </p>
          </Card>
        </div>

        {/* Recent Users */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
          {loading ? (
            <p>Loading...</p>
          ) : recentUsers.length === 0 ? (
            <p className="text-neutral-500">No recent users found.</p>
          ) : (
            <ul className="divide-y">
              {recentUsers.map((user) => (
                <li key={user.id} className="py-2 flex justify-between items-center">
                  <span>
                    <span className="font-medium">{user.name || user.email}</span>
                    <span className="ml-2 text-xs text-neutral-500">{user.role}</span>
                  </span>
                  <span className="text-xs text-neutral-400">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;