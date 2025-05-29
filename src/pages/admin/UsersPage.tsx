import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../lib/store';
import Button from '../../components/ui/Button';

const roles = [
  { label: 'All', value: '' },
  { label: 'Admin', value: 'admin' },
  { label: 'Employer', value: 'employer' },
  { label: 'Job Seeker', value: 'jobseeker' },
];

const UsersPage: React.FC = () => {
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<string>('');

  const fetchUsers = async (roleFilter = '') => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      console.log('fetchUsers', roleFilter);
      if (roleFilter) params.append('role', roleFilter);
      params.append('limit', '100');
      const response = await fetch(`https://lucky-determination-production.up.railway.app/api/users?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
      setUsers(data.filter((user: any) => user.role !== 'deleted'));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(role);
    // eslint-disable-next-line
  }, [role]);

  // Update user role
  const handleUpdate = async (userId: string) => {
    console.log('handleUpdate', userId);
    setLoading(true);
    
    setError(null);
    console.log(token)
    console.log(userId, editRole);
    try {
      const response = await fetch(`https://lucky-determination-production.up.railway.app/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: editRole }),
      });
      const data = await response.json();
      console.log('response', response);
      console.log('data', data);
      if (!response.ok) throw new Error(data.message || 'Failed to update user');
      setEditUserId(null);
      fetchUsers(role);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete user (soft delete: set role to 'deleted' or remove user)
  const handleDelete = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setLoading(true);
    setError(null);
    try {
      // You can either set a deleted flag or actually delete the user
      const response = await fetch(`https://lucky-determination-production.up.railway.app/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: 'deleted' }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete user');
      fetchUsers(role);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="mb-4 flex gap-4 items-center">
        <label className="font-medium">Filter by Role:</label>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {roles.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
        <Button onClick={() => fetchUsers(role)}>Refresh</Button>
      </div>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr>
                <th className="px-2 py-1 border">Name</th>
                <th className="px-2 py-1 border">Email</th>
                <th className="px-2 py-1 border">Role</th>
                <th className="px-2 py-1 border">Created At</th>
                <th className="px-2 py-1 border">Updated At</th>
                <th className="px-2 py-1 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-2 py-1 border">{user.name || '-'}</td>
                  <td className="px-2 py-1 border">{user.email}</td>
                  <td className="px-2 py-1 border capitalize">
                    {editUserId === user.id ? (
                      <select
                        value={editRole}
                        onChange={e => setEditRole(e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        {roles
                          .filter(r => r.value !== '')
                          .map(r => (
                            <option key={r.value} value={r.value}>
                              {r.label}
                            </option>
                          ))}
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="px-2 py-1 border">{user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</td>
                  <td className="px-2 py-1 border">{user.updatedAt ? new Date(user.updatedAt).toLocaleString() : '-'}</td>
                  <td className="px-2 py-1 border space-x-2">
                    {editUserId === user.id ? (
                      <>
                        <Button size="sm" onClick={() => handleUpdate(user.id)}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditUserId(null)}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" onClick={() => { setEditUserId(user.id); setEditRole(user.role); }}>
                          Update
                        </Button>
                        <Button size="sm" variant="primary" onClick={() => handleDelete(user.id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="text-neutral-500 mt-4">No users found.</p>}
        </div>
      )}
    </div>
  );
};

export default UsersPage;