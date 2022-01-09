import { wikipediaBandInfo } from './wikipediaBandInfo';
import { SongInfo } from '../../types/SongInfo';

describe('wikipediaBandInfo', () => {
  test('should gets wikipediaBandInfo', async () => {
    const bandInfo = await wikipediaBandInfo({
      artist: 'Pain of Salvation',
      album: 'Entropia',
      title: '01 - ! (Foreword)',
    } as SongInfo);

    expect(bandInfo).toBeTruthy();
  });
});
