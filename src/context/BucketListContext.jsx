import { useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { normalizeCountry } from '../api/countriesApi';
import BucketListContext from './bucketListContextValue';

function upsertCountry(list, country) {
  const normalized = normalizeCountry(country);
  if (!normalized?.code) {
    return list;
  }

  const exists = list.some((item) => item.code === normalized.code);
  if (exists) {
    return list;
  }

  return [normalized, ...list];
}

function moveCountry(list, fromCode, toCode) {
  const fromIndex = list.findIndex((country) => country.code === fromCode);
  const toIndex = list.findIndex((country) => country.code === toCode);

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return list;
  }

  const nextList = [...list];
  const [movedCountry] = nextList.splice(fromIndex, 1);
  nextList.splice(toIndex, 0, movedCountry);
  return nextList;
}

export function BucketListProvider({ children }) {
  const [wishlist, setWishlist] = useLocalStorage('wanderlog-wishlist', []);
  const [visited, setVisited] = useLocalStorage('wanderlog-visited', []);

  const addToWishlist = (country) => {
    setWishlist((current) => upsertCountry(current, country));
  };

  const removeFromWishlist = (code) => {
    setWishlist((current) => current.filter((country) => country.code !== code));
  };

  const markVisited = (country) => {
    setVisited((current) => upsertCountry(current, country));
  };

  const removeVisited = (code) => {
    setVisited((current) => current.filter((country) => country.code !== code));
  };

  const reorderWishlist = (fromCode, toCode) => {
    setWishlist((current) => moveCountry(current, fromCode, toCode));
  };

  const reorderVisited = (fromCode, toCode) => {
    setVisited((current) => moveCountry(current, fromCode, toCode));
  };

  const isInWishlist = (code) => wishlist.some((country) => country.code === code);

  const isVisited = (code) => visited.some((country) => country.code === code);

  const stats = useMemo(() => {
    const wishlistPopulation = wishlist.reduce((total, country) => total + (country.population || 0), 0);

    return {
      wishlistCount: wishlist.length,
      visitedCount: visited.length,
      wishlistPopulation,
    };
  }, [visited.length, wishlist]);

  const value = useMemo(
    () => ({
      wishlist,
      visited,
      addToWishlist,
      removeFromWishlist,
      markVisited,
      removeVisited,
      reorderWishlist,
      reorderVisited,
      isInWishlist,
      isVisited,
      ...stats,
    }),
    [stats, visited, wishlist],
  );

  return <BucketListContext.Provider value={value}>{children}</BucketListContext.Provider>;
}
