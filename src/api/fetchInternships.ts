import type { Internship } from '../types';

const SIMULATED_DELAY_MS = 900;
const SIMULATED_ERROR_RATE = 0.25; // roughly 1 in 4 requests fails, to force real error handling

function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Request aborted', 'AbortError'));
    });
  });
}

export async function fetchInternships(signal: AbortSignal): Promise<Internship[]> {
  await delay(SIMULATED_DELAY_MS, signal);

  if (Math.random() < SIMULATED_ERROR_RATE) {
    throw new Error('Network error: could not load internships. Please try again.');
  }

  const response = await fetch(`${import.meta.env.BASE_URL}mock-data.json`, { signal });
  if (!response.ok) {
    throw new Error(`Server responded with status ${response.status}.`);
  }
  return (await response.json()) as Internship[];
}
