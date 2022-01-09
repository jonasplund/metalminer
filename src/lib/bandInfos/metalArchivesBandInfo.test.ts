import { SongInfo } from '../../types/SongInfo';
import { metalArchivesBandInfo } from './metalArchivesBandInfo';

describe('metalArchivesBandInfo', () => {
  test('should get metalArchivesBandInfo', async () => {
    const bandInfo = await metalArchivesBandInfo({
      artist: 'Pain of Salvation',
      album: 'Entropia',
      title: '01 - ! (Foreword)',
    } as SongInfo);

    expect(bandInfo).toBeTruthy();
  });
});
