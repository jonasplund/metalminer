import { FunctionCallee } from '../types/FunctionCallee';
import { SongInfo } from '../types/SongInfo';
import { Config } from './config';
import { functionCalleeSorter } from './functionCalleeSorter';
import { setlistfmSetlist } from './setlists/setlistfmSetlist';

export const getSetlist = () => async (songInfo: SongInfo) => {
  const functions: FunctionCallee<string[]>[] = [
    {
      name: 'setlistfm',
      func: setlistfmSetlist,
      prio: 1,
      enabled: Config.settings.remotesEnabled.setlistfm,
    },
  ];
  const results = await Promise.allSettled(
    functions
      .filter((fn) => fn.enabled)
      .map(async (fn) => ({ ...fn, data: await fn.func(songInfo) }))
  );
  const resultValues = results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => (result as PromiseFulfilledResult<FunctionCallee<string[]>>).value);
  resultValues.sort(functionCalleeSorter);
  return resultValues.map(({ name, data }) => ({ name, data }));
};
