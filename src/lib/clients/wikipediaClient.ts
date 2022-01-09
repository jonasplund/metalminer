import { fetchString } from '../fetcher/fetchString';

export const wikipediaClient = {
  getBandInfoPageHtml: (link: string): Promise<string> => {
    const wikipediaLink = link
      .replace('en.wikipedia.org', 'en.m.wikipedia.org')
      .replace('/url?q=', '')
      .replace(/\&sa=.*/, '');
    return fetchString(wikipediaLink);
  },
};
