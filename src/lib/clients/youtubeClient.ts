import { GoogleCustomSearchResult } from '../../types/youtube';
import { Config } from '../config';
import { fetchJson } from '../fetcher/fetchJson';

const baseUrl = 'https://www.googleapis.com/customsearch/v1';

export const youtubeClient = {
  getVideo: async (artist: string, title: string): Promise<GoogleCustomSearchResult> => {
    const googleApiKey = Config.settings.youtube?.googleApiKey;
    const customYoutubeSearchEngine = Config.settings.youtube?.customYoutubeSearchEngine;
    artist = artist.toLowerCase().replace(/ /g, '+');
    title = title
      .toLowerCase()
      .replace(/^[0-9]{2,3} - /, '')
      .replace(/ /g, '+');
    const url = `${baseUrl}?q=${[artist, title].join(
      '+'
    )}+official&key=${googleApiKey}&cx=${customYoutubeSearchEngine}`;
    return fetchJson<GoogleCustomSearchResult>(url);
  },
};
