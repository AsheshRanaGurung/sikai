import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);
  return debouncedValue;
};
export default useDebounce;

//how to use?
//  const [value, setValue] = useState<string>('')
// const debouncedValue = useDebounce<string>(value, 2000)

// useEffect(() => {
// Do fetch here...
// Triggers when "debouncedValue" changes
//   }, [debouncedValue])
