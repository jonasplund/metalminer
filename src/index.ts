import { Config } from './lib/config';
import { getBandInfo } from './lib/getBandInfo';
import { getLyrics } from './lib/getLyrics';
import { getSetlist } from './lib/getSetlist';
import { getSimilarArtists } from './lib/getSimilarArtists';
import { getVideo } from './lib/getVideo';
import { ConfigObject } from './types/ConfigObject';

export const metalminer = (settings: ConfigObject) => {
  Config.init(settings);
  return {
    getLyrics: getLyrics(),
    getBandInfo: getBandInfo(),
    getSimilarArtists: getSimilarArtists(),
    getVideo: getVideo(),
    getSetlist: getSetlist(),
  };
};
