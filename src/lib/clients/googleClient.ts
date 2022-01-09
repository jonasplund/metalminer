import { fetchString } from '../fetcher/fetchString';

const baseUrl = 'http://www.google.com/search';

export const googleClient = {
  searchBandWikipediaHtml: async (artist: string): Promise<string> => {
    const googleUri = encodeURI(
      `${baseUrl}?q=${artist.replace(/ /g, '+')}+band+site:en.wikipedia.org`
    );
    return fetchString(googleUri);
  },
};
