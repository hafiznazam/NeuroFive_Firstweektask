import { Link } from 'react-router-dom';

interface HeaderProps {
  applicationCount: number;
}

export default function Header({ applicationCount }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__brand">
          Neurofinve Internships
        </Link>
        <span className="header__count" aria-live="polite">
          {applicationCount} {applicationCount === 1 ? 'application' : 'applications'} sent
        </span>
      </div>
    </header>
  );
}
