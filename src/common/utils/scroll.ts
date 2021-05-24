import { throttle } from "lodash";

const WAIT = 300;

export const setScrollEvent = (fn: (...args: any) => any) => {
  window.addEventListener("scroll", throttle(fn, WAIT));
};
