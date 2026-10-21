import { Link } from 'react-router-dom';
import Badge from './Badge';
import type { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
}

export default function InternshipCard({ internship }: InternshipCardProps) {
  const { id, title, company, location, workMode, tags } = internship;

  return (
    <article className="card">
      <h2 className="card__title">
        <Link to={`/internships/${id}`}>{title}</Link>
      </h2>
      <p className="card__meta">
        {company} · {location}
      </p>
      <div className="card__badges">
        <Badge label={workMode} variant="mode" />
        {tags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>
    </article>
  );
}
