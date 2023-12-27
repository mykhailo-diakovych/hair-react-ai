import { useUnmount } from "react-use";
import { RefObject, useEffect, useRef, useState } from "react";
import { initDeepAr, shutdown } from "@config/deepar";

import { DeepAr } from "../interfaces/deepAr.interface";

export const useDeepAr = (
  canvasRef: RefObject<HTMLCanvasElement>,
  withEffect = false,
  reInitialize = false
) => {
  const deepAr = useRef<DeepAr | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const onInitialize = async () => {
    try {
      setLoading(true);

      if (deepAr.current || window.DeepAR) {
        await deepAr.current?.shutdown();
        await window.DeepAR?.shutdown();

        deepAr.current = null;
        window.DeepAR = null;
      }

      if (window?.DeepAR?.module && !reInitialize) {
        deepAr.current = window.DeepAR;
      } else if (canvasRef.current && !deepAr.current) {
        deepAr.current = await initDeepAr(canvasRef, withEffect);
        window.DeepAR = deepAr.current;
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      onInitialize();
    }
  }, [canvasRef.current]);

  useUnmount(async () => {
    await shutdown(deepAr);
  });

  return { deepAr: deepAr, loading, error };
};
