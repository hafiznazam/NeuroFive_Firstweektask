import type { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <div className="field">
      <label htmlFor="search" className="field__label">
        Search
      </label>
      <input
        id="search"
        type="search"
        className="input"
        placeholder="Title or company"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
