import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Jobs
import JobsPage from './pages/jobs/JobsPage';
import JobDetailPage from './pages/jobs/JobDetailPage';

// Employer
import EmployerDashboard from './pages/employer/DashboardPage';
import EmployerPostJob from './pages/employer/PostJobPage';
import EmployerApplications from './pages/employer/ApplicationsPage';
import EmployerProfile from './pages/employer/ProfilePage';
import EmployerLayout from './pages/employer/EmployerLayout';

// Admin
import AdminDashboard from './pages/admin/DashboardPage';
import AdminJobs from './pages/admin/JobsPage';
import UsersPage from './pages/admin/UsersPage';
import AdminLayout from './pages/admin/AdminLayout';

// Jobseeker
import JobSeekerApplications from './pages/jobseeker/ApplicationsPage';
import JobSeekerProfile from './pages/jobseeker/ProfilePage';

function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Routes>
                    {/* Public */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/jobs" element={<JobsPage />} />
                    <Route path="/jobs/:id" element={<JobDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Employer */}
                    <Route path="/employer" element={<EmployerLayout><EmployerDashboard /></EmployerLayout>} />
                    <Route path="/employer/dashboard" element={<EmployerLayout><EmployerDashboard /></EmployerLayout>} />
                    <Route path="/employer/applications" element={<EmployerLayout><EmployerApplications /></EmployerLayout>} />
                    <Route path="/employer/post-job" element={<EmployerLayout><EmployerPostJob /></EmployerLayout>} />
                    <Route path="/employer/profile" element={<EmployerLayout><EmployerProfile /></EmployerLayout>} />

                    {/* Admin */}
                    <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                    <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                    <Route path="/admin/jobs" element={<AdminLayout><AdminJobs /></AdminLayout>} />
                    <Route path="/admin/users" element={<AdminLayout><UsersPage /></AdminLayout>} />

                    {/* Jobseeker */}
                    <Route path="/jobseeker/applications" element={<JobSeekerApplications />} />
                    <Route path="/jobseeker/profile" element={<JobSeekerProfile />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App; 