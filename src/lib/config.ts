import { ConfigObject } from '../types/ConfigObject';

export class Config {
  static settings: ConfigObject;

  private static verify(_settings: ConfigObject) {
    if (!_settings?.remotesEnabled) {
      throw new Error('Missing config for metalminer');
    }

    const getErrorString = (remoteName: string, propertyName: string) =>
      `${remoteName} config error: Missing config for ${propertyName}. Disable the remote ${remoteName} or provide the settings`;

    if (_settings.remotesEnabled.lastfm && !_settings.lastfm?.apiKey) {
      throw new Error(getErrorString('lastfm', 'apiKey'));
    }
    if (_settings.remotesEnabled.setlistfm && !_settings.setlistfm?.apiKey) {
      throw new Error(getErrorString('setlistfm', 'apiKey'));
    }
    if (_settings.remotesEnabled.youtube && !_settings.youtube?.customYoutubeSearchEngine) {
      throw new Error(getErrorString('youtube', 'customYoutubeSearchEngine'));
    }
    if (_settings.remotesEnabled.youtube && !_settings.youtube?.googleApiKey) {
      throw new Error(getErrorString('youtube', 'googleApiKey'));
    }
  }

  static init(_settings: ConfigObject) {
    Config.verify(_settings);
    Config.settings = _settings;
  }
}
