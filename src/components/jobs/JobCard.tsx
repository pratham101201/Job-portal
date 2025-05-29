import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Job } from '../../lib/types';
import { formatCurrency, capitalizeFirstLetter, getRelativeTimeString } from '../../lib/utils';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, featured = false }) => {
  return (
    <Card className={`group transition-all duration-300 ${featured ? 'border-primary/30 bg-primary/5' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-neutral-800 group-hover:text-primary transition-colors">
              <Link to={`/jobs/${job.id}`}>{job.title}</Link>
            </CardTitle>
            <p className="text-neutral-600 font-medium">{job.company}</p>
          </div>
          {featured && (
            <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3 text-sm text-neutral-500">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-1" />
              <span>{capitalizeFirstLetter((job.jobType || '').replace('-', ' ')) || 'N/A'}</span>
            </div>
            {job.salary && (
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>
                  {formatCurrency(job.salary.min, job.salary.currency)} - {formatCurrency(job.salary.max, job.salary.currency)}
                </span>
              </div>
            )}
          </div>
          
          <p className="text-neutral-600 line-clamp-2">
            {job.description}
          </p>
          
                <div className="flex flex-wrap gap-2">
          {(job.requirements || []).slice(0, 3).map((requirement, index) => (
            <span key={index} className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded-full">
              {requirement}
            </span>
          ))}
          {(job.requirements && job.requirements.length > 3) && (
            <span className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded-full">
              +{job.requirements.length - 3} more
            </span>
          )}
        </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center text-xs text-neutral-400">
          <Clock className="w-3 h-3 mr-1" />
          <span>{getRelativeTimeString(job.createdAt)}</span>
        </div>
        <Link 
          to={`/jobs/${job.id}`}
          className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          View details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;