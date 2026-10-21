export type WorkMode = 'Remote' | 'On-site' | 'Hybrid';

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: WorkMode;
  category: string;
  stipend: string;
  duration: string;
  deadline: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface Application {
  internshipId: string;
  name: string;
  email: string;
  coverNote: string;
  submittedAt: string;
}

/** Discriminated union: each status carries only the data that makes sense for it. */
export type FetchState =
  | { status: 'loading' }
  | { status: 'success'; data: Internship[] }
  | { status: 'error'; message: string };
