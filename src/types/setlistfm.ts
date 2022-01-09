export interface SetlistfmSearchResult {
  type: string;
  itemsPerPage: number;
  page: number;
  total: number;
  setlist?: SetlistfmSetlist[];
  artist?: SetlistfmArtist[];
}

export interface SetlistfmArtist {
  mbid: string;
  name: string;
  sortName: string;
  disambiguation: string;
  url: string;
}

export interface SetlistfmCoords {
  lat: number;
  long: number;
}

export interface SetlistfmCountry {
  code: string;
  name: string;
}

export interface SetlistfmCity {
  id: string;
  name: string;
  state: string;
  stateCode: string;
  coords: SetlistfmCoords;
  country: SetlistfmCountry;
}

export interface SetlistfmVenue {
  id: string;
  name: string;
  city: SetlistfmCity;
  url: string;
}

export interface SetlistfmTour {
  name: string;
}

export interface SetlistfmCover {
  mbid: string;
  name: string;
  sortName: string;
  disambiguation: string;
  url: string;
}

export interface SetlistfmSong {
  name: string;
  info: string;
  cover: SetlistfmCover;
  tape?: boolean;
}

export interface Set {
  song: SetlistfmSong[];
  encore?: number;
}

export interface Sets {
  set: Set[];
}

export interface SetlistfmSetlist {
  id: string;
  versionId: string;
  eventDate: string;
  lastUpdated: Date;
  artist: SetlistfmArtist;
  venue: SetlistfmVenue;
  tour: SetlistfmTour;
  sets: Sets;
  url: string;
}
