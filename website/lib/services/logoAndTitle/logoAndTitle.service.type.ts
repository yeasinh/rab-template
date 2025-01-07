export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface LogoAndTitle {
  id: number;
  titleEn: string;
  titleBn: string;
  headerLogoPath: string;
  isPublished: Publish;
  createdAt: Date;
  updateAt: Date;
}

export interface GetLogoAndTitleRequest {
  page: number;
  limit: number;
}

export interface GetLogoAndTitleResponse {
  findAllLogoAndTitle: LogoAndTitle[];
}
