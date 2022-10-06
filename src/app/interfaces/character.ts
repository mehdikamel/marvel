export interface Character {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: Url[];
  thumbnail: Image;
  comics: ComicList;
}

export interface CharacterListResponse {
  code: number;
  status: string;
  data: {
    results: Character[];
    count: number;
    limit: number;
    offset: number;
    total: number;
  };
}

export interface Url {
  type: string;
  url: string;
}

export interface Image {
  path: string;
  extension: string;
}

export interface ComicList {
  available: number;
  returned: number;
  collectionURI: string;
  items: ComicSummary[];
}

export interface ComicSummary {
  resourceURI: string;
  name: string;
}
