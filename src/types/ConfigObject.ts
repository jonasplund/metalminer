export interface ConfigObject {
  remotesEnabled: {
    google: boolean;
    lastfm: boolean;
    metalArchives: boolean;
    setlistfm: boolean;
    songLyrics: boolean;
    wikipedia: boolean;
    youtube: boolean;
  };
  lastfm?: {
    apiKey: string;
  };
  setlistfm?: {
    apiKey: string;
  };
  youtube?: {
    googleApiKey: string;
    customYoutubeSearchEngine: string;
  };
}
