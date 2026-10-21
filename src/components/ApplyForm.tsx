import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import FormField from './FormField';
import type { Application } from '../types';

interface FormValues {
  name: string;
  email: string;
  coverNote: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = { name: '', email: '', coverNote: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOTE_MIN = 30;
const NOTE_MAX = 500;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const note = values.coverNote.trim();

  if (name.length < 2) errors.name = 'Enter your full name (at least 2 characters).';
  if (!email) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email, like name@example.com.';
  if (note.length < NOTE_MIN) {
    errors.coverNote = `Write at least ${NOTE_MIN} characters (you have ${note.length}).`;
  } else if (note.length > NOTE_MAX) {
    errors.coverNote = `Keep it under ${NOTE_MAX} characters (you have ${note.length}).`;
  }
  return errors;
}

interface ApplyFormProps {
  internshipId: string;
  onSubmit: (application: Application) => void;
}

export default function ApplyForm({ internshipId, onSubmit }: ApplyFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // clear that field's error while typing
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit({
      internshipId,
      name: values.name.trim(),
      email: values.email.trim(),
      coverNote: values.coverNote.trim(),
      submittedAt: new Date().toISOString(),
    });
    setValues(EMPTY_VALUES);
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2>Apply for this internship</h2>
      <FormField id="name" label="Full name" value={values.name} onChange={handleChange} error={errors.name} />
      <FormField id="email" label="Email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
      <FormField
        id="coverNote"
        label="Cover note"
        multiline
        value={values.coverNote}
        onChange={handleChange}
        error={errors.coverNote}
        hint={`${values.coverNote.trim().length}/${NOTE_MAX} characters`}
      />
      <button type="submit" className="button">
        Submit application
      </button>
    </form>
  );
}
