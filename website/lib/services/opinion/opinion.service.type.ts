export interface OpinionType {
  id: number;
  name: string;
  email: string;
  mobileNo: string;
  nid: string;
  description: string;
  createdAt: Date;
  updateAt: Date;
}

export interface GetOpinionRequestType {
  page: number;
  limit: number;
}

export interface GetOpinionResponseType {
  findAllOpinion: OpinionType[];
}

export interface CreateOpinionRequestType {
  name: string;
  email: string;
  mobileNo: string;
  nid: string;
  description: string;
}

export interface CreateOpinionResponseType {
  createOpinion: OpinionType;
}

export interface EditOpinionRequestType extends CreateOpinionRequestType {
  id: number;
}

export interface EditOpinionResponseType {
  updateOpinion: OpinionType;
}

export interface DeleteOpinionRequestType {
  id: number;
}

export interface DeleteOpinionResponseType {
  removeOpinion: OpinionType;
}
