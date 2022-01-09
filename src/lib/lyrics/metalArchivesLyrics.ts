import { DataFetcher } from '../../types/DataFetcher';
import { SongInfo } from '../../types/SongInfo';
import { metalArchivesClient } from '../clients/metalArchivesClient';

export const metalArchivesLyrics: DataFetcher<string> = async (songInfo: SongInfo) => {
  if (!songInfo || !songInfo.title) {
    return;
  }
  const searchResponse = await metalArchivesClient.searchSongs(
    songInfo.title,
    songInfo.artist,
    songInfo.album
  );
  if (
    searchResponse.error !== '' ||
    searchResponse.iTotalDisplayRecords < 1 ||
    searchResponse.aaData.length === 0 ||
    searchResponse.aaData[0].length < 5
  ) {
    return;
  }
  const link = searchResponse.aaData[0][4];
  const songId = link.match(/id="lyricsLink_(.*?)"/)?.[1]!;
  const lyricsResponse = await metalArchivesClient.getLyrics(songId);
  return lyricsResponse.includes('lyrics not available') ? undefined : lyricsResponse;
};
