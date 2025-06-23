// User types
export type UserRole = 'jobseeker' | 'employer' | 'admin';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: number;
  photoURL?: string;
}

export interface JobSeeker extends User {
  role: 'jobseeker';
  resume?: string;
  skills: string[];
  experience: number; // in years
  education: Education[];
  appliedJobs: string[]; // job ids
}

export interface Employer extends User {
  role: 'employer';
  companyName: string;
  companyDescription: string;
  industry: string;
  location: string;
  website?: string;
  postedJobs: string[]; // job ids
}

export interface Admin extends User {
  role: 'admin';
}

// Job types
export interface Job {
  id: string;
  title: string;
  company: string;
  employerId: string;
  description: string;
  requirements: string[];
  location: string;
  salary?: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  category: string;
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
  applications: string[]; // application ids
}

// Application types
export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  resume: string;
  coverLetter?: string;
  status: 'pending' | 'reviewing' | 'rejected' | 'accepted';
  appliedAt: number;
  updatedAt: number;
}

// Additional types
export interface Education {
  degree: string;
  institution: string;
  fieldOfStudy: string;
  startYear: number;
  endYear?: number;
  current: boolean;
}