# Metalminer

A node module to extract music related info from various sources.

## Install

`yarn add metalminer`

## Example usage

```typescript
import metalminer from 'metalminer';

// To see which properties are necessary in songInfo, see below
const songInfo = {
  title: 'Song Title',
  artist: 'Band name',
  album: 'Album name',
};

const config = {
  remotesEnabled: {
    google: true,
    lastfm: true,
    metalArchives: true,
    setlistfm: true,
    songLyrics: true,
    wikipedia: true,
    youtube: true,
  },
  lastfm: {
    apiKey: 'Enter api key for lastfm',
  },
  setlistfm: {
    apiKey: 'Enter api key for setlistfm',
  },
  youtube: {
    googleApiKey: 'Enter api key for google',
    customYoutubeSearchEngine: 'Enter id for google custom search limited to youtube',
  },
};

const lyrics = await metalminer(config).getLyrics(songInfo);
```

## Types

```typescript
interface SongInfo {
  title?: string;
  artist?: string;
  album?: string;
}

interface ResultObject<T> {
  x: T;
}
```

## Methods

### metalminer.getLyrics(songInfo: SongInfo): Promise<ResultObject<string>>

Currently supported sites:

- metal-archives.com
- songlyrics.com

**Arguments**

- songInfo - Required properties: `title`, `artist` and `album`.

**Return value**

-

### metalminer.getBandInfo(songInfo: SongInfo): Promise<ResultObject<string>>

Currently supported sites:

- wikipedia.org
- metal-archives.com

**Arguments**

- songInfo - Required properties: `artist` and `album`. album can be set to any album made by the artist and is used to filter the results.

### metalminer.getSimilarArtists(songInfo: SongInfo): Promise<ResultObject<string>>

Currently supported sites:

- metal-archives.com
- last.fm

**Arguments**

- songInfo - Required properties: `artist` and `album`

### metalminer.getVideo(songInfo: SongInfo): Promise<ResultObject<string>>

To use the video feature you need a Google API key which you set in the settings.js file.

Currently supported sites:

- youtube.com

**Arguments**

- songInfo - Required properties: `artist` and `title`

### metalminer.getSetlist(songInfo: SongInfo): Promise<ResultObject<string>>

Currently supported sites:

- last.fm

**Arguments**

- songInfo - An object containing the property `artist`

**Return value**
an array of song titles from the band's latest concert.
