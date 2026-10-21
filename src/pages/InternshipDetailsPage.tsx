import { Link, useParams } from 'react-router-dom';
import ApplyForm from '../components/ApplyForm';
import Badge from '../components/Badge';
import { EmptyState, ErrorState, LoadingState } from '../components/StatusMessage';
import type { Application, FetchState } from '../types';

interface InternshipDetailsPageProps {
  state: FetchState;
  onRetry: () => void;
  applications: Application[];
  onApply: (application: Application) => void;
}

export default function InternshipDetailsPage({
  state,
  onRetry,
  applications,
  onApply,
}: InternshipDetailsPageProps) {
  const { id } = useParams<{ id: string }>();

  if (state.status === 'loading') return <LoadingState />;
  if (state.status === 'error') return <ErrorState message={state.message} onRetry={onRetry} />;

  const internship = state.data.find((i) => i.id === id);
  if (!internship) {
    return (
      <EmptyState
        title="Internship not found"
        message="This listing may have been removed."
        actionLabel="Back to internships"
        actionTo="/"
      />
    );
  }

  const submitted = applications.find((a) => a.internshipId === internship.id);

  return (
    <article className="details">
      <Link to="/" className="back-link">
        Back to all internships
      </Link>
      <h1>{internship.title}</h1>
      <p className="card__meta">
        {internship.company} · {internship.location}
      </p>
      <div className="card__badges">
        <Badge label={internship.workMode} variant="mode" />
        {internship.tags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>

      <dl className="facts">
        <div><dt>Stipend</dt><dd>{internship.stipend}</dd></div>
        <div><dt>Duration</dt><dd>{internship.duration}</dd></div>
        <div><dt>Apply by</dt><dd>{internship.deadline}</dd></div>
        <div><dt>Category</dt><dd>{internship.category}</dd></div>
      </dl>

      <p>{internship.description}</p>
      <h2>What you will do</h2>
      <ul>
        {internship.responsibilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>What we look for</h2>
      <ul>
        {internship.requirements.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {submitted ? (
        <div className="success" role="status">
          <h2>Application sent</h2>
          <p>
            Thanks, {submitted.name}. We saved your application for {internship.title} and will
            contact you at {submitted.email}.
          </p>
        </div>
      ) : (
        <ApplyForm internshipId={internship.id} onSubmit={onApply} />
      )}
    </article>
  );
}
