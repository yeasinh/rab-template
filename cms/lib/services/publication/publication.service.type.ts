export enum CheckStatus {
  YES = "YES",
  NO = "NO",
}

export enum PublishStatus {
  YES = "YES",
  NO = "NO",
}

export interface PublicationType {
  id: number;
  titleBn: string;
  titleEn: string;
  authorNameBn: string;
  authorNameEn: string;
  publisherBn: string;
  publisherEn: string;
  publicationYear: Date;
  publicationFilePath: string;
  isPreviewButton: CheckStatus;
  isDownloadButton: CheckStatus;
  isPublished: PublishStatus;
  createdAt: Date;
  updateAt: Date;
}

export interface GetPublicationRequestType {
  page: number;
  limit: number;
}

export interface GetPublicationResponseType {
  findAllPublication: PublicationType[];
}

export interface CreatePublicationRequestType {
  titleBn: string;
  titleEn: string;
  authorNameBn: string;
  authorNameEn: string;
  publisherBn: string;
  publisherEn: string;
  publicationYear: Date;
  publicationFilePath: string;
  isPreviewButton: CheckStatus;
  isDownloadButton: CheckStatus;
  isPublished: PublishStatus;
}

export interface CreatePublicationResponseType {
  createPublication: PublicationType;
}

export interface EditPublicationRequestType
  extends CreatePublicationRequestType {
  id: number;
}

export interface EditPublicationResponseType {
  updatePublication: PublicationType;
}

export interface DeletePublicationRequestType {
  id: number;
}

export interface DeletePublicationResponseType {
  removePublication: PublicationType;
}
