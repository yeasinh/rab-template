export enum CheckStatus {
  YES = "YES",
  NO = "NO",
}

export interface PermissionType {
  id: number;
  menuId: number;
  viewPermission: CheckStatus;
  deletePermission: CheckStatus;
  editPermission: CheckStatus;
  createdAt: Date;
  updateAt: Date;
}

export interface GetPermissionRequestType {
  page: number;
  limit: number;
}

export interface GetPermissionResponseType {
  findAllPermission: PermissionType[];
}

export interface CreatePermissionRequestType {
  menuId: number;
  viewPermission: CheckStatus;
  deletePermission: CheckStatus;
  editPermission: CheckStatus;
}

export interface CreatePermissionResponseType {
  createPermission: PermissionType;
}

export interface EditPermissionRequestType extends CreatePermissionRequestType {
  id: number;
}

export interface EditPermissionResponseType {
  updatePermission: PermissionType;
}

export interface DeletePermissionRequestType {
  id: number;
}

export interface DeletePermissionResponseType {
  removePermission: PermissionType;
}
