import { useCallback, useState } from "react";

export const useToggle = (
  initialValue?: boolean
): [boolean, (state?: unknown) => void] => {
  const [value, setValue] = useState(initialValue || false);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
};
