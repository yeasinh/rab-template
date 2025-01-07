export interface QuickContactType {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  nid: string;
  message: string;
  createdAt: Date;
  updateAt: Date;
}

export interface GetQuickContactRequestType {
  page: number;
  limit: number;
}

export interface GetQuickContactResponseType {
  findAllQuickContact: QuickContactType[];
}

export interface CreateQuickContactRequestType {
  name: string;
  mobileNo: string;
  email: string;
  nid: string;
  message: string;
}

export interface CreateQuickContactResponseType {
  createQuickContact: QuickContactType;
}

export interface EditQuickContactRequestType
  extends CreateQuickContactRequestType {
  id: number;
}

export interface EditQuickContactResponseType {
  updateQuickContact: QuickContactType;
}

export interface DeleteQuickContactRequestType {
  id: number;
}

export interface DeleteQuickContactResponseType {
  removeQuickContact: QuickContactType;
}
