import { useState } from 'react';

interface UseBoolean {
  value: boolean;
  onFalse: () => void;
  onToggle: () => void;
  onTrue: () => void;
}

export const useBoolean = (): UseBoolean => {
  const [value, setValue] = useState<boolean>(false);

  const onTrue = (): void => setValue(true);
  const onFalse = (): void => setValue(false);
  const onToggle = (): void => setValue(!value);

  return {
    value,
    onFalse,
    onToggle,
    onTrue
  };
};