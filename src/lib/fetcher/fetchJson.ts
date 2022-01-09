import fetch, { RequestInit } from 'node-fetch';

export const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const x = await fetch(url, options);
  const response = await x.json();
  return response as T;
};
