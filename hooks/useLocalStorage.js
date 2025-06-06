import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const getValue = () => {
    const storage = localStorage.getItem(key); //string || null

    if (storage) {
      return JSON.parse(storage);
    }

    return initialValue;
  };
  const [value, setValue] = useState(getValue());

  //   const saved = localStorage.getItem(key);
  //   const [value, setValue] = useState(JSON.parse(saved) || defaultValue);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
