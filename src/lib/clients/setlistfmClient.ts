import { SetlistfmSearchResult } from '../../types/setlistfm';
import { Config } from '../config';
import { fetchJson } from '../fetcher/fetchJson';

const baseUrl = 'https://api.setlist.fm/rest/1.0';

export const setlistfmClient = {
  searchArtists: async (artist: string): Promise<SetlistfmSearchResult> => {
    const apiKey = Config.settings.setlistfm!.apiKey;
    const searchArtistUrl = encodeURI(`${baseUrl}/search/artists?artistName=${artist}`);
    const response = await fetchJson<SetlistfmSearchResult>(searchArtistUrl, {
      headers: { 'x-api-key': apiKey, Accept: 'application/json' },
    });
    return response;
  },
  searchSetlist: async (mbid: string) => {
    const apiKey = Config.settings.setlistfm!.apiKey;
    const searchSetlistUrl = `${baseUrl}/artist/${mbid}/setlists`;
    const response = await fetchJson<SetlistfmSearchResult>(searchSetlistUrl, {
      headers: { 'x-api-key': apiKey, Accept: 'application/json' },
    });
    return response;
  },
};
