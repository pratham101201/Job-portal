import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { getCurrentUser, getUserData, updateEmployerProfile } from '../../lib/firebase';

const EmployerProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    companyName: '',
    companyDescription: '',
    industry: '',
    location: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const user = getCurrentUser();
        if (!user) throw new Error('Not authenticated');
        const data = await getUserData(user.uid);
        // Type-narrowing to allow access to employer fields
        const employerData = data as typeof data & {
          companyName?: string;
          companyDescription?: string;
          industry?: string;
          location?: string;
          website?: string;
        };
        setProfile({
          companyName: employerData.companyName ?? '',
          companyDescription: employerData.companyDescription ?? '',
          industry: employerData.industry ?? '',
          location: employerData.location ?? '',
          website: employerData.website ?? '',
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const user = getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      await updateEmployerProfile(user.uid, profile);
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Company Profile</h1>

      <Card className="max-w-2xl">
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Company Name"
            name="companyName"
            placeholder="Enter your company name"
            value={profile.companyName}
            onChange={handleChange}
            disabled={loading}
          />

          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Company Description
            </label>
            <textarea
              className="input min-h-[150px]"
              name="companyDescription"
              placeholder="Tell us about your company..."
              value={profile.companyDescription}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <Input
            label="Industry"
            name="industry"
            placeholder="e.g. Technology, Healthcare, etc."
            value={profile.industry}
            onChange={handleChange}
            disabled={loading}
          />

          <Input
            label="Location"
            name="location"
            placeholder="Company location"
            value={profile.location}
            onChange={handleChange}
            disabled={loading}
          />

          <Input
            label="Website"
            name="website"
            type="url"
            placeholder="https://example.com"
            value={profile.website}
            onChange={handleChange}
            disabled={loading}
          />

          {error && <div className="text-error text-sm">{error}</div>}
          {success && <div className="text-success text-sm">{success}</div>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EmployerProfile;