
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserType {
    ADMIN = "ADMIN",
    OTHER = "OTHER"
}

export enum Check {
    YES = "YES",
    NO = "NO"
}

export enum Publish {
    YES = "YES",
    NO = "NO"
}

export enum MediaType {
    SLIDER = "SLIDER",
    VEDIO = "VEDIO",
    PHOTO = "PHOTO",
    TVC = "TVC"
}

export class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: UserType;
}

export class UpdateUserInput {
    firstName: string;
    lastName: string;
    email?: Nullable<string>;
    password?: Nullable<string>;
    userType?: Nullable<UserType>;
    id: number;
}

export class ChangePasswordInput {
    email: string;
    password: string;
    rememberToken: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class CreateMediaInput {
    titleBn: string;
    titleEn: string;
    subTitleBn: string;
    subTitleEn: string;
    isPublished: Publish;
    mediaType: MediaType;
    mediaFilePath: Upload;
}

export class UpdateMediaInput {
    id: number;
    titleBn: string;
    titleEn: string;
    subTitleBn: string;
    subTitleEn: string;
    isPublished: Publish;
    mediaType: MediaType;
    mediaFilePath: Upload;
}

export class CreatePublicationInput {
    titleBn: string;
    titleEn: string;
    authorNameBn: string;
    authorNameEn: string;
    publisherBn: string;
    publisherEn: string;
    publicationYear: string;
    publicationFilePath: Upload;
    isPreviewButton: Check;
    isDownloadButton: Check;
    isPublished: Publish;
}

export class UpdatePublicationInput {
    id: number;
    titleBn: string;
    titleEn: string;
    authorNameBn: string;
    authorNameEn: string;
    publisherBn: string;
    publisherEn: string;
    publicationYear: string;
    publicationFilePath: Upload;
    isPreviewButton: Check;
    isDownloadButton: Check;
    isPublished: Publish;
}

export class CreateAdminMenuInput {
    menuName: string;
    url: string;
}

export class UpdateAdminMenuInput {
    id: number;
    menuName: string;
    url: string;
}

export class CreatePermissionInput {
    menuId: number;
    viewPermission: Check;
    deletePermission: Check;
    editPermission: Check;
}

export class UpdatePermissionInput {
    id: number;
    menuId: number;
    viewPermission: Check;
    deletePermission: Check;
    editPermission: Check;
}

export class CreateAdminPortalPersmissionInput {
    userId: number;
    permissionId: number[];
}

export class UpdateAdminPortalPersmissionInput {
    id: number;
    userId: number;
    permissionId: number[];
}

export class User {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email: string;
    password: string;
    rememberToken: string;
    userType: UserType;
    emailVarifiedAt?: Nullable<string>;
    createdAt: DateTime;
    updateAt?: Nullable<DateTime>;
}

export class AdminMenu {
    id: number;
    menuName: string;
    url: string;
    createdAt: DateTime;
    updateAt?: Nullable<DateTime>;
}

export class Permission {
    id: number;
    menuId: number;
    viewPermission: Check;
    deletePermission: Check;
    editPermission: Check;
    createdAt: DateTime;
    updateAt?: Nullable<DateTime>;
}

export class Auth {
    id: number;
    name: string;
    token: string;
    userType: UserType;
    permissionId: number[];
    permissions: Permission[];
    menus: AdminMenu[];
}

export class Media {
    id: number;
    titleBn: string;
    titleEn: string;
    subTitleBn: string;
    subTitleEn: string;
    mediaFilePath?: Nullable<string>;
    isPublished: Publish;
    mediaType: MediaType;
    createdAt: DateTime;
    updateAt?: Nullable<DateTime>;
}

export class Publication {
    id: number;
    titleBn: string;
    titleEn: string;
    authorNameBn: string;
    authorNameEn: string;
    publisherBn: string;
    publisherEn: string;
    publicationYear: DateTime;
    publicationFilePath?: Nullable<string>;
    isPreviewButton: Check;
    isDownloadButton: Check;
    isPublished: Publish;
    createdAt: DateTime;
    updateAt?: Nullable<DateTime>;
}

export class AdminPortalPermission {
    id: number;
    userId: number;
    permissionId: number[];
    createdAt: DateTime;
    updateAt?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract users(page: number, limit: number): User[] | Promise<User[]>;

    abstract user(id: number): User | Promise<User>;

    abstract findAllMedia(page: number, limit: number): Media[] | Promise<Media[]>;

    abstract findOneMedia(id: number): Media | Promise<Media>;

    abstract findAllPublication(page: number, limit: number): Publication[] | Promise<Publication[]>;

    abstract findOnePublication(id: number): Publication | Promise<Publication>;

    abstract findAllAdminMenu(page: number, limit: number): AdminMenu[] | Promise<AdminMenu[]>;

    abstract findOneAdminMenu(id: number): AdminMenu | Promise<AdminMenu>;

    abstract findAllPermission(page: number, limit: number): Permission[] | Promise<Permission[]>;

    abstract findOnePermission(id: number): Permission | Promise<Permission>;

    abstract findAllAdminPortalPermission(page: number, limit: number): AdminPortalPermission[] | Promise<AdminPortalPermission[]>;

    abstract findOneAdminPortalPermission(id: number): AdminPortalPermission | Promise<AdminPortalPermission>;
}

export abstract class IMutation {
    abstract registerUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract forgotPassword(email: string): User | Promise<User>;

    abstract changePassword(changePasswordInput: ChangePasswordInput): User | Promise<User>;

    abstract removeUser(id: number): User | Promise<User>;

    abstract login(data: LoginInput): Auth | Promise<Auth>;

    abstract createMedia(createMediaInput: CreateMediaInput): Media | Promise<Media>;

    abstract updateMedia(updateMediaInput: UpdateMediaInput): Media | Promise<Media>;

    abstract removeMedia(id: number): Media | Promise<Media>;

    abstract createPublication(createPublicationInput: CreatePublicationInput): Publication | Promise<Publication>;

    abstract updatePublication(updatePublicationInput: UpdatePublicationInput): Publication | Promise<Publication>;

    abstract removePublication(id: number): Publication | Promise<Publication>;

    abstract createAdminMenu(createAdminMenuInput: CreateAdminMenuInput): AdminMenu | Promise<AdminMenu>;

    abstract updateAdminMenu(updateAdminMenuInput: UpdateAdminMenuInput): AdminMenu | Promise<AdminMenu>;

    abstract removeAdminMenu(id: number): AdminMenu | Promise<AdminMenu>;

    abstract createPermission(createPermissionInput: CreatePermissionInput): Permission | Promise<Permission>;

    abstract updatePermission(updatePermissionInput: UpdatePermissionInput): Permission | Promise<Permission>;

    abstract removePermission(id: number): Permission | Promise<Permission>;

    abstract createAdminPortalPermission(createAdminPortalPersmissionInput: CreateAdminPortalPersmissionInput): AdminPortalPermission | Promise<AdminPortalPermission>;

    abstract updateAdminPortalPermission(updateAdminPortalPersmissionInput: UpdateAdminPortalPersmissionInput): AdminPortalPermission | Promise<AdminPortalPermission>;

    abstract removeAdminPortalPermission(id: number): AdminPortalPermission | Promise<AdminPortalPermission>;
}

export type DateTime = any;
export type Upload = any;
type Nullable<T> = T | null;
