import { useCallback, useEffect, useReducer, useState } from 'react';
import { fetchInternships } from '../api/fetchInternships';
import type { FetchState, Internship } from '../types';

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; data: Internship[] }
  | { type: 'FETCH_ERROR'; message: string };

// useReducer is used here (not useState) because loading/success/error are
// mutually exclusive states of ONE state machine; the reducer makes impossible
// combinations (e.g. loading + error) unrepresentable.
function reducer(_state: FetchState, action: Action): FetchState {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading' };
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.data };
    case 'FETCH_ERROR':
      return { status: 'error', message: action.message };
  }
}

const initialState: FetchState = { status: 'loading' };

export function useInternships() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: 'FETCH_START' });

    fetchInternships(controller.signal)
      .then((data) => dispatch({ type: 'FETCH_SUCCESS', data }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return; // component unmounted / StrictMode re-run
        const message = err instanceof Error ? err.message : 'Something went wrong.';
        dispatch({ type: 'FETCH_ERROR', message });
      });

    return () => controller.abort(); // cleanup avoids stale updates
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { state, retry };
}
