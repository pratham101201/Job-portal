import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit as limitQuery
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auth functions
export const registerUser = async (email: string, password: string, displayName: string, role: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      displayName,
      role,
      createdAt: Date.now(),
      // Add role-specific fields
      ...(role === 'jobseeker' && {
        skills: [],
        experience: 0,
        education: [],
        appliedJobs: []
      }),
      ...(role === 'employer' && {
        companyName: '',
        companyDescription: '',
        industry: '',
        location: '',
        postedJobs: []
      })
    });

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getUserData = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw error;
  }
};

// Job functions
export const createJob = async (jobData: any) => {
  try {
    const jobsCollection = collection(db, 'jobs');
    const newJobRef = doc(jobsCollection);
    const jobId = newJobRef.id;

    await setDoc(newJobRef, {
      ...jobData,
      id: jobId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isActive: true,
      applications: []
    });

    // Update employer's postedJobs array
    const employerRef = doc(db, 'users', jobData.employerId);
    const employerDoc = await getDoc(employerRef);

    if (employerDoc.exists()) {
      const employerData = employerDoc.data();
      await updateDoc(employerRef, {
        postedJobs: [...(employerData.postedJobs || []), jobId]
      });
    }

    return jobId;
  } catch (error) {
    throw error;
  }
};

export const getJobs = async (filters: { category?: string; location?: string } = {}) => {
  try {
    const jobsCollection = collection(db, 'jobs');
    let jobQuery = query(jobsCollection, where('isActive', '==', true), orderBy('createdAt', 'desc'));

    // Apply filters if provided
    // This is a simplified example - you'd add more complex filtering logic here
    if (filters.category) {
      jobQuery = query(jobQuery, where('category', '==', filters.category));
    }

    if (filters.location) {
      jobQuery = query(jobQuery, where('location', '==', filters.location));
    }

    const querySnapshot = await getDocs(jobQuery);
    const jobs: any[] = [];

    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });

    return jobs;
  } catch (error) {
    throw error;
  }
};

export const getJob = async (jobId: string) => {
  try {
    const jobDoc = await getDoc(doc(db, 'jobs', jobId));
    console.log(jobDoc);
    if (jobDoc.exists()) {
      return { id: jobDoc.id, ...jobDoc.data() };
    } else {
      throw new Error('Job not found');
    }
  } catch (error) {
    throw error;
  }
};

// Application functions
export const applyForJob = async (applicationData: any) => {
  try {
    const applicationsCollection = collection(db, 'applications');
    const newApplicationRef = doc(applicationsCollection);
    const applicationId = newApplicationRef.id;

    await setDoc(newApplicationRef, {
      ...applicationData,
      id: applicationId,
      status: 'pending',
      appliedAt: Date.now(),
      updatedAt: Date.now()
    });

    // Update job's applications array
    const jobRef = doc(db, 'jobs', applicationData.jobId);
    const jobDoc = await getDoc(jobRef);

    if (jobDoc.exists()) {
      const jobData = jobDoc.data();
      await updateDoc(jobRef, {
        applications: [...(jobData.applications || []), applicationId]
      });
    }

    // Update user's appliedJobs array
    const userRef = doc(db, 'users', applicationData.userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      await updateDoc(userRef, {
        appliedJobs: [...(userData.appliedJobs || []), applicationData.jobId]
      });
    }

    return applicationId;
  } catch (error) {
    throw error;
  }
};

export const getApplications = async (userId: string, type: 'user' | 'job', status?: string) => {
  try {
    const applicationsCollection = collection(db, 'applications');
    let applicationQuery;

    if (type === 'user') {
      applicationQuery = query(applicationsCollection, where('userId', '==', userId));
    } else {
      applicationQuery = query(applicationsCollection, where('jobId', '==', userId));
    }

    if (status) {
      applicationQuery = query(applicationQuery, where('status', '==', status));
    }

    applicationQuery = query(applicationQuery, orderBy('appliedAt', 'desc'));

    const querySnapshot = await getDocs(applicationQuery);
    const applications: any[] = [];

    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });

    return applications;
  } catch (error) {
    throw error;
  }
};

export const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
  try {
    const applicationRef = doc(db, 'applications', applicationId);
    await updateDoc(applicationRef, {
      status: newStatus,
      updatedAt: Date.now()
    });
    return true;
  } catch (error) {
    throw error;
  }
};

// Admin functions
export const getAllUsers = async (role?: string, limitCount?: number) => {
  try {
    const usersCollection = collection(db, 'users');
    let userQuery;

    if (role) {
      userQuery = query(usersCollection, where('role', '==', role));
    } else {
      userQuery = query(usersCollection);
    }

    if (limitCount) {
      userQuery = query(userQuery, limitQuery(limitCount));
    }

    const querySnapshot = await getDocs(userQuery);
    const users: any[] = [];

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    throw error;
  }
};

export const updateEmployerProfile = async (userId: string, profile: {
  companyName: string;
  companyDescription: string;
  industry: string;
  location: string;
  website: string;
}) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      companyName: profile.companyName,
      companyDescription: profile.companyDescription,
      industry: profile.industry,
      location: profile.location,
      website: profile.website,
      updatedAt: Date.now(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export { auth, db, onAuthStateChanged };