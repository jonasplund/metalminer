import { FunctionCallee } from '../types/FunctionCallee';

export const functionCalleeSorter = (a: FunctionCallee<any>, b: FunctionCallee<any>) => {
  if (a.data && !b.data) {
    return 1;
  }
  if (!a.data && b.data) {
    return -1;
  }
  return a.prio - b.prio;
};
