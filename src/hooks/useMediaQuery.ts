import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const handler = (_e: UIEvent) => {
      const mediaMatches = window.matchMedia(query).matches;
      setMatches(mediaMatches);
    };

    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  });

  return matches;
};
