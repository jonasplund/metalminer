import { DataFetcher } from '../../types/DataFetcher';
import { SongInfo } from '../../types/SongInfo';
import { setlistfmClient } from '../clients/setlistfmClient';

export const setlistfmSetlist: DataFetcher<string[]> = async (songInfo: SongInfo) => {
  if (!songInfo || !songInfo.artist) {
    return;
  }
  const searchArtistResponse = await setlistfmClient.searchArtists(songInfo.artist);

  if (!searchArtistResponse.artist) {
    return;
  }
  const artistLower = songInfo.artist.toLocaleLowerCase();
  const artist = searchArtistResponse.artist.find(
    (item) => item.name.toLowerCase() === artistLower
  );
  if (!artist) {
    return;
  }
  const mbid = artist.mbid;

  const searchSetlistResponse = await setlistfmClient.searchSetlist(mbid);
  if (!searchSetlistResponse.setlist) {
    return;
  }
  const setlist = searchSetlistResponse.setlist.find((x) => x.sets?.set?.find((y) => y.song));
  if (!setlist) {
    return;
  }
  return setlist.sets.set.find((x) => x.song?.length)?.song.map((song) => song.name);
};
