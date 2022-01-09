import { fetchString } from '../fetcher/fetchString';

const baseUrl = 'http://www.songlyrics.com';

export const songLyricsClient = {
  getLyricsHtml: async (artist: string, title: string): Promise<string> => {
    artist = artist.toLowerCase().replace(/ /gi, '-');
    title = `${title
      .toLowerCase()
      .replace(/^[0-9]{2,3} - /, '')
      .replace(/ /gi, '-')}-lyrics`;
    const url = `${baseUrl}/${artist}/${title}`;
    return await fetchString(url);
  },
};
