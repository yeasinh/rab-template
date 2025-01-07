export interface Contact {
  id: number;
  addressEn: string;
  addressBn: string;
  addressIconPath: string;
  phoneEn: string;
  phoneBn: string;
  phoneIconPath: string;
  mobileEn: string;
  mobileBn: string;
  mobileIconPath: string;
  faxEn: string;
  faxBn: string;
  faxIconPath: string;
  createdAt: Date;
  updateAt: Date;
}

export interface GetContactRequest {
  page: number;
  limit: number;
}

export interface GetContactResponse {
  findAllConatctInfo: Contact[];
}
