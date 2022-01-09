import { DataFetcher } from '../../types/DataFetcher';
import { metalArchivesClient } from '../clients/metalArchivesClient';

export const metalArchivesBandInfo: DataFetcher<string> = async (songInfo) => {
  // http://www.metal-archives.com/band/read-more/id/32922
  if (!songInfo || !songInfo.album || !songInfo.artist) {
    return;
  }
  const searchResult = await metalArchivesClient.searchAlbums(songInfo.album, songInfo.artist);
  if (
    searchResult.error ||
    searchResult.iTotalDisplayRecords < 1 ||
    searchResult.aaData.length === 0 ||
    searchResult.aaData[0].length === 0
  ) {
    return;
  }
  const link = searchResult.aaData[0][0];
  const bandId = link.match(/(?:\/bands\/.*?\/)([0-9]+)(?:" )/)?.[1];
  if (!bandId) {
    return;
  }
  const bandInfo = await metalArchivesClient.getBandInfo(bandId);
  return bandInfo ? bandInfo : undefined;
};
