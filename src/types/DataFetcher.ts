import { SongInfo } from './SongInfo';

export type DataFetcher<T> = (metaInfo: SongInfo) => Promise<T | undefined>;
