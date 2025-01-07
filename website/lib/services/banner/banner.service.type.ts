export enum PublishStatus {
  YES = "YES",
  NO = "NO",
}

export interface BannerType {
  id: number;
  bannerFilePath: string;
  isPublished: PublishStatus;
  createdAt: Date;
  updateAt: Date;
}

export interface GetBannerRequestType {
  page: number;
  limit: number;
}

export interface GetBannerResponseType {
  findAllAddsBanner: BannerType[];
}
