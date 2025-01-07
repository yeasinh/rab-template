export enum MediaTypes {
  SLIDER = "SLIDER",
  VEDIO = "VEDIO",
  PHOTO = "PHOTO",
  TVC = "TVC",
}

export enum PublishTypes {
  YES = "YES",
  NO = "NO",
}

export interface MediaType {
  id: number;
  titleBn: string;
  titleEn: string;
  subTitleBn: string;
  subTitleEn: string;
  mediaFilePath: string;
  mediaType: MediaTypes;
  isPublished: PublishTypes;
  createdAt: Date;
  updateAt: Date;
}

export interface GetMediaRequestType {
  page: number;
  limit: number;
}

export interface GetMediaResponseType {
  findAllMedia: MediaType[];
}
