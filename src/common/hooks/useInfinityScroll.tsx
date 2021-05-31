import { useCallback, useEffect } from "react";
import { setScrollEvent } from "../utils/scroll";

const BOTTOM = 100;

const useInfinityScroll = (fn: (...args: any) => any) => {
  const onScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - BOTTOM) fn();
  }, [fn]);

  useEffect(() => {
    setScrollEvent(onScroll);
  }, [onScroll]);
};

export default useInfinityScroll;
