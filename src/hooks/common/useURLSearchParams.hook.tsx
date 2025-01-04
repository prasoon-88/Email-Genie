import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useURLSearchParams = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const getParams = useCallback(
    (key: string, defaultValue?: any) => {
      return searchParams.get(key) ?? defaultValue;
    },
    [searchParams]
  );

  const setSearchParams = (values: Map<string, string>) => {
    const currParams = new URLSearchParams(searchParams.toString());
    for (let [key, value] of values) {
      currParams.set(key, value);
    }
    router.push(pathName + "?" + currParams.toString());
  };

  return { getParams, setSearchParams };
};

export default useURLSearchParams;
