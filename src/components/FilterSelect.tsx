import type { ChangeEvent } from 'react';

interface FilterSelectProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  allLabel: string;
  onChange: (value: string) => void;
}

export default function FilterSelect({
  id,
  label,
  value,
  options,
  allLabel,
  onChange,
}: FilterSelectProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value);

  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      <select id={id} className="input" value={value} onChange={handleChange}>
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
