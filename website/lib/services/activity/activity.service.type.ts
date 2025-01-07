export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface ActivityType {
  id: number;
  headingEn: string;
  headingBn: string;
  descriptionBn: string;
  descriptionEn: string;
  acitivityDate: Date;
  activityImagePath: string[];
  isPublished: Publish;
  createdAt: Date;
  updateAt: Date;
}

export interface GetActivityRequestType {
  page: number;
  limit: number;
}

export interface GetActivityResponseType {
  findAllActivity: ActivityType[];
}
