import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { fetchApplications } from '../../lib/utils';

interface Application {
  id: string;
  jobTitle: string;
  userName: string;
  userEmail: string;
  coverLetter: string;
  status: string;
  appliedAt: number;
}

const EmployerApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for dialog
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState<string | null>(null);

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token') || '';
        const data = await fetchApplications(token);
        setApplications(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };
    loadApplications();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Job Applications</h1>
      <Card className="p-6">
        {loading && <p className="text-neutral-600">Loading applications...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <div>
            {applications.length === 0 ? (
              <p className="text-neutral-600">No applications yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="px-2 py-1 text-left">Job Title</th>
                      <th className="px-2 py-1 text-left">Applicant Name</th>
                      <th className="px-2 py-1 text-left">Email</th>
                      <th className="px-2 py-1 text-left">Cover Letter</th>
                      <th className="px-2 py-1 text-left">Status</th>
                      <th className="px-2 py-1 text-left">Applied At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id}>
                        <td className="px-2 py-1">{app.jobTitle}</td>
                        <td className="px-2 py-1">{app.userName}</td>
                        <td className="px-2 py-1">{app.userEmail}</td>
                        <td className="px-2 py-1">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => {
                              setSelectedCoverLetter(app.coverLetter || 'No cover letter provided.');
                              setShowDialog(true);
                            }}
                          >
                            View Cover Letter
                          </button>
                        </td>
                        <td className="px-2 py-1">{app.status}</td>
                        <td className="px-2 py-1">{new Date(app.appliedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Simple Dialog/Modal */}
        {showDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
              <h2 className="text-lg font-semibold mb-4">Cover Letter</h2>
              <div className="mb-4 whitespace-pre-line">{selectedCoverLetter}</div>
              <button
                className="px-4 py-2 bg-primary text-white rounded"
                onClick={() => setShowDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EmployerApplications;