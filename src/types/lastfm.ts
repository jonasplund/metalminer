export interface LastfmImage {
  '#text': string;
  size: string;
}

export interface LastfmArtist {
  name: string;
  mbid: string;
  match: string;
  url: string;
  image: LastfmImage[];
  streamable: string;
}

export interface LastfmAttr {
  artist: string;
}

export interface LastfmSimilarartists {
  artist: LastfmArtist[];
  '@attr': Attr;
}

export interface LastfmSimilarArtistsResponse {
  similarartists: LastfmSimilarartists;
  error?: string;
}
