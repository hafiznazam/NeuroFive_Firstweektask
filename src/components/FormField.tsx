import type { ChangeEvent } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: 'text' | 'email';
  multiline?: boolean;
  hint?: string;
}

export default function FormField({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  multiline = false,
  hint,
}: FormFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const commonProps = {
    id,
    name: id,
    value,
    onChange,
    className: `input${error ? ' input--invalid' : ''}`,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  };

  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      {multiline ? (
        <textarea rows={5} {...commonProps} />
      ) : (
        <input type={type} {...commonProps} />
      )}
      {error ? (
        <p id={`${id}-error`} className="field__error" role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="field__hint">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
