import { create } from 'zustand';
import { User, Job, JobApplication } from './types';
import { auth, getUserData, onAuthStateChanged } from './firebase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  initializeAuthListener: ()=>() => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  setUser: (user) => set({ user, isLoading: false }),
  setError: (error) => set({ error, isLoading: false }),
  clearError: () => set({ error: null }),
  initializeAuthListener: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserData(firebaseUser.uid);
          set({ user: userData as User, isLoading: false });
        } catch (error) {
          set({ 
            user: null, 
            error: 'Failed to load user data', 
            isLoading: false 
          });
        }
      } else {
        set({ user: null, isLoading: false });
      }
    });
    
    // Return unsubscribe function
    return unsubscribe;
  },
}));

interface JobsState {
  jobs: Job[];
  featuredJobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;
  setJobs: (jobs: Job[]) => void;
  setFeaturedJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useJobsStore = create<JobsState>((set) => ({
  jobs: [],
  featuredJobs: [],
  selectedJob: null,
  isLoading: false,
  error: null,
  setJobs: (jobs) => set({ jobs }),
  setFeaturedJobs: (featuredJobs) => set({ featuredJobs }),
  setSelectedJob: (selectedJob) => set({ selectedJob }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

interface ApplicationsState {
  applications: JobApplication[];
  isLoading: boolean;
  error: string | null;
  setApplications: (applications: JobApplication[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useApplicationsStore = create<ApplicationsState>((set) => ({
  applications: [],
  isLoading: false,
  error: null,
  setApplications: (applications) => set({ applications }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));