import { UserStatus, UserType } from "../user/user.service.type";

export interface Token {
  accessToken: string;
}

export interface Menu {
  id: number;
  url: string;
}

export interface Permission {
  id: number;
  viewPermission: string;
  editPermission: string;
  deletePermission: string;
}

interface ILogin {
  name: string;
  token: string;
  permissionId?: number[];
  permissions?: Permission[];
  menus?: Menu[];
  userType?: UserStatus;
  id: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  login: ILogin;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  forgotPassword: UserType;
}

export interface ChangePasswordRequest {
  email: string;
  password: string;
  rememberToken: string;
}

export interface ChangePasswordResponse {
  changePassword: UserType;
}
