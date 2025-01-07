export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface SearchBar {
  id: number;
  placeHolderEn: string;
  placeHolderBn: string;
  // isPublished: Publish;
  createdAt: Date;
  updateAt: Date;
}

export interface GetSearchBarRequest {
  page: number;
  limit: number;
}

export interface GetSearchBarResponse {
  findAllSearchBarInfo: SearchBar[];
}
