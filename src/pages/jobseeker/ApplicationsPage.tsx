import React from 'react';

const JobSeekerApplications: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Loading your applications...</p>
      </div>
    </div>
  );
};

export default JobSeekerApplications;