import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchCountries } from '../api/countriesApi';

const DEFAULT_REGION = 'All';
const DEFAULT_SORT = 'name';

function sortCountries(countries, sortBy) {
  const list = [...countries];

  if (sortBy === 'population') {
    return list.sort((left, right) => right.population - left.population);
  }

  if (sortBy === 'area') {
    return list.sort((left, right) => right.area - left.area);
  }

  return list.sort((left, right) => left.name.localeCompare(right.name));
}

export default function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT);

  const loadCountries = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchCountries();
      setCountries(data);
    } catch (apiError) {
      setError('We could not load countries right now. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();

    const regionFiltered = countries.filter((country) => {
      const matchesRegion = region === DEFAULT_REGION || country.region === region;
      const matchesSearch = !query || country.name.toLowerCase().includes(query);
      return matchesRegion && matchesSearch;
    });

    return sortCountries(regionFiltered, sortBy);
  }, [countries, region, search, sortBy]);

  return {
    countries,
    filteredCountries,
    loading,
    error,
    retry: loadCountries,
    search,
    setSearch,
    region,
    setRegion,
    sortBy,
    setSortBy,
  };
}
