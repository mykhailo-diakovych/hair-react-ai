import { useEffect, useRef, useState } from "react";

export function useDynamicImageImport(path: string) {
  const importedImageRef = useRef<React.ImgHTMLAttributes<HTMLImageElement>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const importImage = async (): Promise<void> => {
    try {
      importedImageRef.current = (
        await import(`../assets/img/${path}`)
      ).default;
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    importImage();
  }, [path]);

  return { error, loading, Image: importedImageRef.current };
}
