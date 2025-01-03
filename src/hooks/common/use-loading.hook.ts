import { useCallback, useState } from "react";

export default function useLoading(initial: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(initial);

  const toggleLoading = useCallback(() => {
    setIsLoading((pre) => !pre);
    return isLoading;
  }, [isLoading]);

  const onLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const offLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const withLoading = async <T>(asyncFunc: () => Promise<T>) => {
    try {
      onLoading();
      return await asyncFunc();
    } finally {
      offLoading();
    }
  };

  return {
    isLoading,
    toggleLoading,
    onLoading,
    offLoading,
    withLoading,
  };
}
