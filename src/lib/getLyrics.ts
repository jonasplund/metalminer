import { FunctionCallee } from '../types/FunctionCallee';
import { SongInfo } from '../types/SongInfo';
import { Config } from './config';
import { functionCalleeSorter } from './functionCalleeSorter';
import { metalArchivesLyrics } from './lyrics/metalArchivesLyrics';
import { songLyricsLyrics } from './lyrics/songLyricsLyrics';

export const getLyrics = () => async (songInfo: SongInfo) => {
  const functions: FunctionCallee<string>[] = [
    {
      name: 'Metal Archives',
      func: metalArchivesLyrics,
      prio: 1,
      enabled: Config.settings.remotesEnabled.metalArchives,
    },
    {
      name: 'Song Lyrics',
      func: songLyricsLyrics,
      prio: 2,
      enabled: Config.settings.remotesEnabled.songLyrics,
    },
  ];
  const results = await Promise.allSettled(
    functions
      .filter((fn) => fn.enabled)
      .map(async (fn) => ({ ...fn, data: await fn.func(songInfo) }))
  );
  const resultValues = results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => (result as PromiseFulfilledResult<FunctionCallee<string>>).value);
  resultValues.sort(functionCalleeSorter);
  return resultValues.map(({ name, data }) => ({ name, data }));
};
