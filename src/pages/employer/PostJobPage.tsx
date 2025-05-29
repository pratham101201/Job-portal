import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { jobTypes, jobCategories } from '../../lib/utils';

const EmployerPostJob: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [jobType, setJobType] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://lucky-determination-production.up.railway.app/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          location,
          company,
          salary,
          jobType,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to post job');
      }

      setSuccess(true);
      setTitle('');
      setDescription('');
      setCategory('');
      setLocation('');
      setCompany('');
      setSalary('');
    } catch (err: any) {
      setError(err.message || 'Failed to post job');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>
      <Card className="max-w-2xl mx-auto">
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Job Title"
            placeholder="e.g. Senior Software Engineer"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Job Description
            </label>
            <textarea
              className="input min-h-[120px] w-full"
              placeholder="Describe the role and responsibilities..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>
           <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Category
            </label>
            <select
  className="input w-full"
  value={category}
  onChange={e => setCategory(e.target.value)}
  required
>
  <option value="">Select Category</option>
  {jobCategories.map((cat) => (
    <option key={cat.value} value={cat.value}>{cat.label}</option>
  ))}
</select>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Type of Job
            </label>
           <select
  className="input w-full"
  value={jobType}
  onChange={e => setJobType(e.target.value)}
  required
>
  <option value="">Select Job Type</option>
  {jobTypes.map((type) => (
    <option key={type.value} value={type.value}>{type.label}</option>
  ))}
</select>
          </div>
          <Input
            label="Location"
            placeholder="e.g. Remote or New York, NY"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />
          <Input
            label="Company"
            placeholder="e.g. Acme Corp"
            value={company}
            onChange={e => setCompany(e.target.value)}
            required
          />
          <Input
            label="Salary"
            placeholder="e.g. $100,000 - $120,000"
            value={salary}
            onChange={e => setSalary(e.target.value)}
          />

          {error && <div className="text-red-600">{error}</div>}
          {success && <div className="text-green-600">Job posted successfully!</div>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Posting...' : 'Post Job'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EmployerPostJob;