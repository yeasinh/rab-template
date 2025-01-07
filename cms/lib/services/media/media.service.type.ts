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

export interface CreateMediaRequestType {
  titleBn: string;
  titleEn: string;
  subTitleBn: string;
  subTitleEn: string;
  mediaFilePath: Blob;
  mediaType: MediaTypes;
  isPublished: PublishTypes;
}

export interface CreateMediaResponseType {
  createMedia: MediaType;
}

export interface EditMediaRequestType extends CreateMediaRequestType {
  id: number;
}

export interface EditMediaResponseType {
  updateMedia: MediaType;
}

export interface DeleteMediaRequestType {
  id: number;
}

export interface DeleteMediaResponseType {
  removeMedia: MediaType;
}
