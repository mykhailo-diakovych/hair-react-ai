import { useUpdateEffect } from "react-use";
import { DependencyList } from "react";

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  useUpdateEffect(() => {
    const t = setTimeout(() => {
      if (!deps?.some((dep) => dep === undefined)) {
        // eslint-disable-next-line prefer-spread
        return fn.apply(undefined, deps as []);
      }
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
