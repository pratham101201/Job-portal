import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/employer/dashboard' },
  { label: 'Applications', path: '/employer/applications' },
  
];

const EmployerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-100 border-r min-h-screen p-6">
        <h2 className="text-xl font-bold mb-8"> Employer panel</h2>
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded hover:bg-neutral-200 transition ${
                location.pathname === item.path ? 'bg-neutral-200 font-semibold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default EmployerLayout;