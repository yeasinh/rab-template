export interface AdminMenuType {
  id: number;
  menuName: string;
  url: string;
  createdAt: Date;
  updateAt: Date;
}

export interface GetAdminMenuRequestType {
  page: number;
  limit: number;
}

export interface GetAdminMenuResponseType {
  findAllAdminMenu: AdminMenuType[];
}

export interface CreateAdminMenuRequestType {
  menuName: string;
  url: string;
}

export interface CreateAdminMenuResponseType {
  createAdminMenu: AdminMenuType;
}

export interface EditAdminMenuRequestType extends CreateAdminMenuRequestType {
  id: number;
}

export interface EditAdminMenuResponseType {
  updateAdminMenu: AdminMenuType;
}

export interface DeleteAdminMenuRequestType {
  id: number;
}

export interface DeleteAdminMenuResponseType {
  removeAdminMenu: AdminMenuType;
}
