interface BadgeProps {
  label: string;
  variant?: 'tag' | 'mode';
}

export default function Badge({ label, variant = 'tag' }: BadgeProps) {
  return <span className={`badge badge--${variant}`}>{label}</span>;
}
