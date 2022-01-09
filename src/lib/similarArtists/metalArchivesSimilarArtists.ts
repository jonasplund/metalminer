import fetch from 'node-fetch';
import { DataFetcher } from '../../types/DataFetcher';
import { MetalArchivesSearchResponse } from '../../types/metalArchives';

export const metalArchivesSimilarArtists: DataFetcher<string[]> = async (songInfo) => {
  if (!songInfo || !songInfo.artist || !songInfo.album) {
    return;
  }
  const artist = songInfo.artist.replace(/ /gi, '+');
  const album = songInfo.album.replace(/\(.*?\)/gi, '').replace(/ /gi, '+');
  const url = `http://www.metal-archives.com/search/ajax-advanced/searching/albums/?bandName=${artist}&releaseTitle=${album}`;
  const albumSearchResult = (await (await fetch(url)).json()) as MetalArchivesSearchResponse;
  if (
    albumSearchResult.error !== '' ||
    albumSearchResult.iTotalDisplayRecords < 1 ||
    albumSearchResult.aaData.length === 0 ||
    albumSearchResult.aaData[0].length === 0
  ) {
    return;
  }
  const link = albumSearchResult.aaData[0][0];
  const match = link.match(/(?:\/bands\/.*?\/)(.*?)(?:">)/)?.[1];
  const similarArtistsSearchUrl = `http://www.metal-archives.com/band/ajax-recommendations/id/${match}`;
  const similarArtistsSearchResult = await (await fetch(similarArtistsSearchUrl)).text();
  let similarArtistMatch;
  const regex = /(?:\/bands\/)([^\/]*)(?:\/)/gi;
  const bands = [];
  while ((similarArtistMatch = regex.exec(similarArtistsSearchResult)) !== null) {
    bands.push(similarArtistMatch[1].replace(/_/gi, ' '));
  }
  if (bands.length > 0) {
    return bands.map((band) => decodeURI(band));
  }
};
