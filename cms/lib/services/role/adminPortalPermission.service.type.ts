export interface AdminPortalPermissionType {
  id: number;
  userId: number;
  permissionId: number[];
  createdAt: Date;
  updateAt: Date;
}

export interface GetAdminPortalPermissionRequestType {
  page: number;
  limit: number;
}

export interface GetAdminPortalPermissionResponseType {
  findAllAdminPortalPermission: AdminPortalPermissionType[];
}

export interface CreateAdminPortalPermissionRequestType {
  userId: number;
  permissionId: number[];
}

export interface CreateAdminPortalPermissionResponseType {
  createAdminPortalPermission: AdminPortalPermissionType;
}

export interface EditAdminPortalPermissionRequestType
  extends CreateAdminPortalPermissionRequestType {
  id: number;
}

export interface EditAdminPortalPermissionResponseType {
  updateAdminPortalPermission: AdminPortalPermissionType;
}

export interface DeleteAdminPortalPermissionRequestType {
  id: number;
}

export interface DeleteAdminPortalPermissionResponseType {
  removeAdminPortalPermission: AdminPortalPermissionType;
}
