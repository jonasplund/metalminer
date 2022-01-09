import fetch, { RequestInit } from 'node-fetch';

export const fetchString = async (url: string, options?: RequestInit): Promise<string> => {
  const response = await (await fetch(url, options)).text();
  return response;
};
