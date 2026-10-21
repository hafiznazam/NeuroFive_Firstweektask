import { Link } from 'react-router-dom';

export function LoadingState() {
  return (
    <div className="status" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>Loading internships…</p>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="status status--error" role="alert">
      <h2>Could not load internships</h2>
      <p>{message}</p>
      <button type="button" className="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
}

export function EmptyState({ title, message, actionLabel, actionTo, onAction }: EmptyStateProps) {
  return (
    <div className="status">
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="button">
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button type="button" className="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
