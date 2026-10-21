import { useMemo, useState } from 'react';
import FilterSelect from '../components/FilterSelect';
import InternshipCard from '../components/InternshipCard';
import SearchBar from '../components/SearchBar';
import { EmptyState, ErrorState, LoadingState } from '../components/StatusMessage';
import { useDebounce } from '../hooks/useDebounce';
import type { FetchState, Internship } from '../types';

interface HomePageProps {
  state: FetchState;
  onRetry: () => void;
}

const unique = (values: string[]): string[] => [...new Set(values)].sort();

export default function HomePage({ state, onRetry }: HomePageProps) {
  // Independent pieces of UI state, so plain useState is the right tool here.
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const internships: Internship[] = state.status === 'success' ? state.data : [];

  const locations = useMemo(() => unique(internships.map((i) => i.location)), [internships]);
  const categories = useMemo(() => unique(internships.map((i) => i.category)), [internships]);

  // Search AND location AND category must all match.
  const filtered = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return internships.filter((i) => {
      const matchesSearch =
        !query || i.title.toLowerCase().includes(query) || i.company.toLowerCase().includes(query);
      const matchesLocation = !location || i.location === location;
      const matchesCategory = !category || i.category === category;
      return matchesSearch && matchesLocation && matchesCategory;
    });
  }, [internships, debouncedSearch, location, category]);

  const clearFilters = () => {
    setSearch('');
    setLocation('');
    setCategory('');
  };

  return (
    <section>
      <h1>Find your next internship</h1>
      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <FilterSelect id="location" label="Location" value={location} options={locations} allLabel="All locations" onChange={setLocation} />
        <FilterSelect id="category" label="Category" value={category} options={categories} allLabel="All categories" onChange={setCategory} />
      </div>

      {state.status === 'loading' && <LoadingState />}
      {state.status === 'error' && <ErrorState message={state.message} onRetry={onRetry} />}
      {state.status === 'success' &&
        (filtered.length === 0 ? (
          <EmptyState
            title="No internships match"
            message="Try a different search term or clear your filters."
            actionLabel="Clear filters"
            onAction={clearFilters}
          />
        ) : (
          <>
            <p className="count" aria-live="polite">
              Showing {filtered.length} of {internships.length} internships
            </p>
            <ul className="grid">
              {filtered.map((internship) => (
                <li key={internship.id}>
                  <InternshipCard internship={internship} />
                </li>
              ))}
            </ul>
          </>
        ))}
    </section>
  );
}
