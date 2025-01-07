export enum WebsiteOrSocialMedia {
  WEBSITE = "WEBSITE",
  SOCIALMEDIA = "SOCIALMEDIA",
}

export interface LinkTitle {
  id: number;
  titleEn: string;
  titleBn: string;
  isWebsite: WebsiteOrSocialMedia;
  createdAt: Date;
  EditAt: Date;
}

export interface GetLinkTitleRequest {
  page: number;
  limit: number;
}

export interface GetLinkTitleResponse {
  findAllQuickLinkInfo: LinkTitle[];
}

export interface LinkItem {
  id: number;
  nameEn: string;
  nameBn: string;
  isWebsite: WebsiteOrSocialMedia;
  iconPath: String;
  url: string;
  createdAt: Date;
  EditAt: Date;
}

export interface GetLinkItemRequest {
  page: number;
  limit: number;
}

export interface GetLinkItemResponse {
  findAllQuickLink: LinkItem[];
}
