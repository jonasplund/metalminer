import { MetalArchivesSearchResponse } from '../../types/metalArchives';
import { fetchJson } from '../fetcher/fetchJson';
import { fetchString } from '../fetcher/fetchString';

const baseUrl = 'http://www.metal-archives.com';

const normalizeQs = (input: string) =>
  encodeURI(input.replace(/^[0-9]{2,3} - /, '').replace(/ /g, '+'));

export const metalArchivesClient = {
  searchSongs: async (
    title: string,
    artist: string,
    album: string
  ): Promise<MetalArchivesSearchResponse> => {
    // https://www.metal-archives.com/search/advanced/searching/songs?songTitle=%21+%28Foreword%29&bandName=Pain+of+Salvation&releaseTitle=Entropia&lyrics=&genre=
    const searchUrl = `${baseUrl}/search/ajax-advanced/searching/songs/?songTitle=${normalizeQs(
      title
    )}&bandName=${normalizeQs(artist)}&releaseTitle=${normalizeQs(album)}`;
    return fetchJson<MetalArchivesSearchResponse>(searchUrl);
  },
  getLyrics: async (songId: string): Promise<string> => {
    const href = `${baseUrl}/release/ajax-view-lyrics/id/${songId}`;
    return fetchString(href);
  },
  getSimilarArtists: async (
    artist: string,
    album: string
  ): Promise<MetalArchivesSearchResponse> => {
    artist = artist.replace(/ /gi, '+');
    album = album.replace(/\(.*?\)/gi, '').replace(/ /gi, '+');
    const url = `${baseUrl}/search/ajax-advanced/searching/albums/?bandName=${artist}&releaseTitle=${album}`;
    return fetchJson<MetalArchivesSearchResponse>(url);
  },
  searchAlbums: async (album: string, artist: string): Promise<MetalArchivesSearchResponse> => {
    var uri = `${baseUrl}/search/ajax-advanced/searching/albums/?bandName=${artist.replace(
      / /gi,
      '+'
    )}&releaseTitle=${album.replace(/\(.*?\)/gi, '').replace(/ /gi, '+')}`;
    return fetchJson<MetalArchivesSearchResponse>(uri);
  },
  getBandInfo: async (bandId: string): Promise<string> => {
    const readMoreUrl = `${baseUrl}/band/read-more/id/${bandId}`;
    return fetchString(readMoreUrl);
  },
};
