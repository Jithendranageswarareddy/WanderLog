import { useEffect, useState } from 'react';

function readStorageValue(key, defaultValue) {
  if (typeof window === 'undefined') {
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue === null) {
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  }
}

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => readStorageValue(key, defaultValue));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Silently ignore storage write errors in environments where storage is unavailable.
    }
  }, [key, value]);

  return [value, setValue];
}
