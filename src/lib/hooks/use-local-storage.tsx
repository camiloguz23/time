'use client';

import { useState } from 'react';

interface UseLocalStorage {
  value: string;
  getStorage: (key: string) => void;
  setStorage: (key: string, value: string) => void;
}

export const useLocalStorage = (): UseLocalStorage => {
  const [value, setValue] = useState<string>('');

  const getStorage = (key: string): void => {
    const data = localStorage.getItem(key);
    setValue(data ?? '');
  };

  const setStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
    getStorage(key);
  };

  return {
    value,
    getStorage,
    setStorage
  };
};