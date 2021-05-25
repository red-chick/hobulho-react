import { range } from "lodash";

export const getYears = () => {
  const nowYear = new Date().getFullYear();
  return range(1900, nowYear + 1);
};
