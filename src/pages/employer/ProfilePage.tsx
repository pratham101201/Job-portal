import React from 'react';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const EmployerProfile: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Company Profile</h1>
      
      <Card className="max-w-2xl">
        <form className="p-6 space-y-6">
          <Input
            label="Company Name"
            placeholder="Enter your company name"
          />
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Company Description
            </label>
            <textarea
              className="input min-h-[150px]"
              placeholder="Tell us about your company..."
            />
          </div>
          
          <Input
            label="Industry"
            placeholder="e.g. Technology, Healthcare, etc."
          />
          
          <Input
            label="Location"
            placeholder="Company location"
          />
          
          <Input
            label="Website"
            type="url"
            placeholder="https://example.com"
          />
          
          <Button type="submit">
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EmployerProfile;