export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface EmergencyContact {
  id: number;
  titleEn: string;
  titleBn: string;
  phoneNumberEn: string;
  phoneNumberBn: string;
  mobileNumberEn: string;
  mobileNumberBn: string;
  isPublished: Publish;
  createdAt: Date;
  updateAt: Date;
}

export interface GetEmergencyContactRequest {
  page: number;
  limit: number;
}

export interface GetEmergencyContactResponse {
  findAllEmergencyConatct: EmergencyContact[];
}
