import { useCallback, useState } from "react";

const useToggle = (
  initial: boolean = false
): [toggle: boolean, onToggle: () => boolean] => {
  const [isToggle, setIsToggle] = useState<boolean>(initial);

  const onToggle = useCallback(() => {
    setIsToggle(!isToggle);
    return !isToggle;
  }, [isToggle]);

  return [isToggle, onToggle];
};

export default useToggle;
