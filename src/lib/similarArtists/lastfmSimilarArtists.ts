import { DataFetcher } from '../../types/DataFetcher';
import { lastfmClient } from '../clients/lastfmClient';

export const lastfmSimilarArtists: DataFetcher<string[]> = async (songInfo) => {
  if (!songInfo || !songInfo.artist) {
    return;
  }
  const response = await lastfmClient.getSimilarArtists(songInfo.artist);
  if (response.error) {
    return;
  }
  const artists = response.similarartists.artist;
  return artists
    .filter((artist) => artist.name && parseFloat(artist.match) > 0.5)
    .map((artist) => artist.name);
};
