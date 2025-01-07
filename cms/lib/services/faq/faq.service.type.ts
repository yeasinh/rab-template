export enum PublishStatus {
  YES = "YES",
  NO = "NO",
}

export interface FaqType {
  id: number;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  isPublished: PublishStatus;
  createdAt: Date;
  updateAt: Date;
}

export interface GetFaqRequestType {
  page: number;
  limit: number;
}

export interface GetFaqResponseType {
  findAllFaq: FaqType[];
}

export interface CreateFaqRequestType {
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  isPublished: PublishStatus;
}

export interface CreateFaqResponseType {
  createFaq: FaqType;
}

export interface EditFaqRequestType extends CreateFaqRequestType {
  id: number;
}

export interface EditFaqResponseType {
  updateFaq: FaqType;
}

export interface DeleteFaqRequestType {
  id: number;
}

export interface DeleteFaqResponseType {
  removeFaq: FaqType;
}
