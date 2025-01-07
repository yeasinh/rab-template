export enum UserStatus {
  ADMIN = "ADMIN",
  OTHER = "OTHER",
}

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: UserStatus;
  rememberToken: string;
  emailVarifiedAt: String;
  createdAt: Date;
  updateAt: Date;
}

export interface GetUserRequestType {
  page: number;
  limit: number;
}

export interface GetUserResponseType {
  users: UserType[];
}

export interface CreateUserRequestType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: UserStatus;
}

export interface CreateUserResponseType {
  createUser: UserType;
}

export interface EditUserRequestType extends CreateUserRequestType {
  id: number;
}

export interface EditUserResponseType {
  updateUser: UserType;
}

export interface DeleteUserRequestType {
  id: number;
}

export interface DeleteUserResponseType {
  removeUser: UserType;
}
