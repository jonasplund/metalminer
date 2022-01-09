import { SongInfo } from './SongInfo';

export interface FunctionCallee<T> {
  name: string;
  func: (metaInfo: SongInfo) => Promise<T | undefined>;
  prio: number;
  data?: T;
  enabled: boolean;
}
