import React from 'react';
import { Card } from '../../components/ui/Card';

const JobSeekerProfile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">John Doe</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">john.doe@example.com</p>
            </div>
            <div>
              <p className="text-gray-600">Location</p>
              <p className="font-medium">New York, NY</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobSeekerProfile;