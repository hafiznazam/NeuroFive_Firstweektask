import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { EmptyState } from './components/StatusMessage';
import { useInternships } from './hooks/useInternships';
import HomePage from './pages/HomePage';
import InternshipDetailsPage from './pages/InternshipDetailsPage';
import type { Application } from './types';

export default function App() {
  // Shared state lives here, the nearest common parent of both routes.
  const { state, retry } = useInternships();
  const [applications, setApplications] = useState<Application[]>([]);

  const addApplication = (application: Application) =>
    setApplications((prev) => [...prev, application]);

  return (
    <div className="app">
      <Header applicationCount={applications.length} />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage state={state} onRetry={retry} />} />
          <Route
            path="/internships/:id"
            element={
              <InternshipDetailsPage
                state={state}
                onRetry={retry}
                applications={applications}
                onApply={addApplication}
              />
            }
          />
          <Route
            path="*"
            element={
              <EmptyState
                title="Page not found"
                message="The page you are looking for does not exist."
                actionLabel="Back to internships"
                actionTo="/"
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
