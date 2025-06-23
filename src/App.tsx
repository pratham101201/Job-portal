import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './lib/store';

// Layout
import Layout from './components/layout/Layout';

// Public pages
import HomePage from './pages/HomePage';
import  LoginPage  from './pages/auth/LoginPage';
import RegisterPage  from './pages/auth/RegisterPage';
import JobsPage from './pages/jobs/JobsPage';
import JobDetailPage from './pages/jobs/JobDetailPage';

// Job seeker pages
import JobSeekerProfile from './pages/jobseeker/ProfilePage';
import JobSeekerApplications from './pages/jobseeker/ApplicationsPage';

// Employer pages
import EmployerDashboard from './pages/employer/DashboardPage';
import EmployerPostJob from './pages/employer/PostJobPage';
import EmployerApplications from './pages/employer/ApplicationsPage';
import EmployerProfile from './pages/employer/ProfilePage';
import EmployerLayout from './pages/employer/EmployerLayout';

// Admin pages
import AdminDashboard from './pages/admin/DashboardPage';
import AdminUsers from './pages/admin/UsersPage';
import AdminJobs from './pages/admin/JobsPage';
import AdminLayout from './pages/admin/AdminLayout';

// Auth route components
const ProtectedRoute: React.FC<{
    children: React.ReactNode;
    allowedRoles?: string[];
}> = ({ children, allowedRoles = [] }) => {
    const { user, isLoading } = useAuthStore();

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

function App() {
    const { initializeAuthListener } = useAuthStore();

    useEffect(() => {
        const unsubscribe = initializeAuthListener();
        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [initializeAuthListener]);

    return (
        <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/login" element={<Layout><LoginPage /></Layout>} />
            <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
            <Route path="/jobs" element={<Layout><JobsPage /></Layout>} />
            <Route path="/jobs/:id" element={<Layout><JobDetailPage /></Layout>} />

            {/* Job seeker routes */}
            <Route
                path="/jobseeker/profile"
                element={
                    <Layout>
                        <ProtectedRoute allowedRoles={['jobseeker']}>
                            <JobSeekerProfile />
                        </ProtectedRoute>
                    </Layout>
                }
            />
            <Route
                path="/jobseeker/applications"
                element={
                    <Layout>
                        <ProtectedRoute allowedRoles={['jobseeker']}>
                            <JobSeekerApplications />
                        </ProtectedRoute>
                    </Layout>
                }
            />

            {/* Employer routes */}
            <Route
                path="/employer/dashboard"
                element={
                    <Layout>
                        <EmployerLayout><ProtectedRoute allowedRoles={['employer']}>
                            <EmployerDashboard />
                            <EmployerPostJob />

                        </ProtectedRoute></EmployerLayout>

                    </Layout>
                }
            />
            <Route
                path="/employer/post-job"
                element={
                    <Layout>
                        <EmployerLayout><ProtectedRoute allowedRoles={['employer']}>
                            <EmployerPostJob />
                        </ProtectedRoute></EmployerLayout>

                    </Layout>
                }
            />
            <Route
                path="/employer/applications"
                element={
                    <Layout>
                        <EmployerLayout> <ProtectedRoute allowedRoles={['employer']}>
                            <EmployerApplications />
                        </ProtectedRoute></EmployerLayout>

                    </Layout>
                }
            />
            <Route
                path="/employer/profile"
                element={
                    <Layout>
                        <ProtectedRoute allowedRoles={['employer']}>
                            <EmployerProfile />
                        </ProtectedRoute>
                    </Layout>
                }
            />

            <Route
                path="/admin/dashboard"
                element={
                    <Layout>
                        <AdminLayout>
                            <AdminDashboard />
                        </AdminLayout>
                    </Layout>
                }
            />
            <Route
                path="/admin/users"
                element={
                    <Layout>
                        <AdminLayout>
                            <AdminUsers />
                        </AdminLayout>
                    </Layout>
                }
            />
            <Route
                path="/admin/jobs"
                element={
                    <Layout>
                        <AdminLayout>
                            <AdminJobs />
                        </AdminLayout>
                    </Layout>
                }
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;