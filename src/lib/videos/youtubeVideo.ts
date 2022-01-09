import { SongInfo } from '../../types/SongInfo';
import { DataFetcher } from '../../types/DataFetcher';
import { youtubeClient } from '../clients/youtubeClient';

export const youtubeVideo: DataFetcher<string> = async (songInfo: SongInfo) => {
  if (!songInfo || !songInfo.artist || !songInfo.title) {
    return;
  }
  const searchResponse = await youtubeClient.getVideo(songInfo.artist, songInfo.title);
  if (!searchResponse || !searchResponse.items || searchResponse.items.length === 0) {
    return;
  }
  const link = searchResponse.items[0].link;
  const matches = link.match(/watch\?v=(.*?)$/);
  return matches?.[1];
};
