import { FunctionCallee } from '../types/FunctionCallee';
import { SongInfo } from '../types/SongInfo';
import { Config } from './config';
import { functionCalleeSorter } from './functionCalleeSorter';
import { youtubeVideo } from './videos/youtubeVideo';

export const getVideo = () => async (songInfo: SongInfo) => {
  const functions: FunctionCallee<string>[] = [
    {
      name: 'Youtube',
      func: youtubeVideo,
      prio: 1,
      enabled: Config.settings.remotesEnabled.google && Config.settings.remotesEnabled.youtube,
    },
  ];
  const results = await Promise.allSettled(
    functions.map(async (fn) => ({ ...fn, data: await fn.func(songInfo) }))
  );
  const resultValues = results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => (result as PromiseFulfilledResult<FunctionCallee<string>>).value);
  resultValues.sort(functionCalleeSorter);
  return resultValues.map(({ name, data }) => ({ name, data }));
};
