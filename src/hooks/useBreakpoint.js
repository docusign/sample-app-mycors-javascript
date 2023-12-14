import { useState, useEffect } from "react";
import debounce from "debounce";

export const SIZE_SM = "sm";
export const SIZE_MD = "md";
export const SIZE_LG = "lg";
export const SIZE_XL = "xl";

const resolveBreakpoint = (width) => {
  if (width <= 360) {
    return SIZE_SM;
  }
  if (width > 360 && width < 768) {
    return SIZE_MD;
  }
  if (width >= 768 && width < 1440) {
    return SIZE_LG;
  }
  return SIZE_XL;
};

const useBreakpoint = () => {
  const [size, setSize] = useState(() => resolveBreakpoint(window.innerWidth));

  useEffect(() => {
    const calcInnerWidth = debounce(() => {
      setSize(resolveBreakpoint(window.innerWidth));
    }, 200);
    window.addEventListener("resize", calcInnerWidth);
    return () => window.removeEventListener("resize", calcInnerWidth);
  }, []);

  return size;
};

export default useBreakpoint;
