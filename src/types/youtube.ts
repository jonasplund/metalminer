export interface Url {
  type: string;
  template: string;
}

export interface Request {
  title: string;
  totalResults: string;
  searchTerms: string;
  count: number;
  startIndex: number;
  inputEncoding: string;
  outputEncoding: string;
  safe: string;
  cx: string;
}

export interface NextPage {
  title: string;
  totalResults: string;
  searchTerms: string;
  count: number;
  startIndex: number;
  inputEncoding: string;
  outputEncoding: string;
  safe: string;
  cx: string;
}

export interface Queries {
  request: Request[];
  nextPage: NextPage[];
}

export interface Context {
  title: string;
}

export interface SearchInformation {
  searchTime: number;
  formattedSearchTime: string;
  totalResults: string;
  formattedTotalResults: string;
}

export interface CseThumbnail {
  src: string;
  width: string;
  height: string;
}

export interface Imageobject {
  width: string;
  url: string;
  height: string;
}

export interface Person {
  name: string;
  url: string;
}

export interface Metatag {}

export interface Videoobject {
  embedurl: string;
  playertype: string;
  isfamilyfriendly: string;
  uploaddate: string;
  videoid: string;
  url: string;
  duration: string;
  unlisted: string;
  name: string;
  paid: string;
  width: string;
  regionsallowed: string;
  genre: string;
  interactioncount: string;
  channelid: string;
  datepublished: string;
  thumbnailurl: string;
  height: string;
  description: string;
}

export interface CseImage {
  src: string;
}

export interface Pagemap {
  cse_thumbnail: CseThumbnail[];
  imageobject: Imageobject[];
  person: Person[];
  metatags: Metatag[];
  videoobject: Videoobject[];
  cse_image: CseImage[];
}

export interface Item {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap: Pagemap;
}

export interface GoogleCustomSearchResult {
  kind: string;
  url: Url;
  queries: Queries;
  context: Context;
  searchInformation: SearchInformation;
  items: Item[];
}
