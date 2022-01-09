import { LastfmSimilarArtistsResponse } from '../../types/lastfm';
import { Config } from '../config';
import { fetchJson } from '../fetcher/fetchJson';

const baseUrl = 'http://ws.audioscrobbler.com/2.0';

export const lastfmClient = {
  getSimilarArtists: async (artist: string): Promise<LastfmSimilarArtistsResponse> => {
    const apiKey = Config.settings.lastfm?.apiKey;
    artist = artist.toLowerCase().replace(/ /gi, '+');
    const url = `${baseUrl}/?method=artist.getsimilar&artist=${artist}&api_key=${apiKey}&format=json`;
    return fetchJson<LastfmSimilarArtistsResponse>(url);
  },
};
