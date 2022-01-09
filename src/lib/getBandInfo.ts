import { FunctionCallee } from '../types/FunctionCallee';
import { SongInfo } from '../types/SongInfo';
import { metalArchivesBandInfo } from './bandInfos/metalArchivesBandInfo';
import { wikipediaBandInfo } from './bandInfos/wikipediaBandInfo';
import { Config } from './config';
import { functionCalleeSorter } from './functionCalleeSorter';

export const getBandInfo = () => async (metaInfo: SongInfo) => {
  const functions: FunctionCallee<string>[] = [
    {
      name: 'Wikipedia',
      func: wikipediaBandInfo,
      prio: 1,
      enabled: Config.settings.remotesEnabled.wikipedia,
    },
    {
      name: 'Metal Archives',
      func: metalArchivesBandInfo,
      prio: 2,
      enabled: Config.settings.remotesEnabled.metalArchives,
    },
  ];
  const results = await Promise.allSettled(
    functions
      .filter((fn) => fn.enabled)
      .map(async (fn) => ({ ...fn, data: await fn.func(metaInfo) }))
  );
  const resultValues = results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => (result as PromiseFulfilledResult<FunctionCallee<string>>).value);
  resultValues.sort(functionCalleeSorter);
  return resultValues.map(({ name, data }) => ({ name, data }));
};
