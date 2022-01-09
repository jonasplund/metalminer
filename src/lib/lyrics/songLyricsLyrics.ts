import { SongInfo } from '../../types/SongInfo';
import { DataFetcher } from '../../types/DataFetcher';
import { JSDOM } from 'jsdom';
import { songLyricsClient } from '../clients/songLyricsClient';

export const songLyricsLyrics: DataFetcher<string> = async (songInfo: SongInfo) => {
  if (!songInfo || !songInfo.artist || !songInfo.title) {
    return;
  }
  const html = await songLyricsClient.getLyricsHtml(songInfo.artist, songInfo.title);

  const dom = new JSDOM(html).window.document;

  Array.from(dom.getElementsByClassName('script')).map((script) =>
    script.parentNode?.removeChild(script)
  );
  const songLyricsDiv = dom.getElementById('songLyricsDiv') as HTMLDivElement | null;
  if (
    songLyricsDiv &&
    songLyricsDiv.childNodes.length > 0 &&
    songLyricsDiv.textContent &&
    !songLyricsDiv.textContent.includes('Sorry, we have no')
  ) {
    return songLyricsDiv.innerHTML;
  }
};
