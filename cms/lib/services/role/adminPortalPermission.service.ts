import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetAdminPortalPermissionResponseType,
  CreateAdminPortalPermissionRequestType,
  EditAdminPortalPermissionRequestType,
  EditAdminPortalPermissionResponseType,
  DeleteAdminPortalPermissionRequestType,
  DeleteAdminPortalPermissionResponseType,
  GetAdminPortalPermissionRequestType,
  CreateAdminPortalPermissionResponseType,
} from "./adminPortalPermission.service.type";

export const adminPortalPermissionService = {
  getAdminPortalPermission: async (
    getAdminPortalPermissionRequest: GetAdminPortalPermissionRequestType
  ): Promise<Response<GetAdminPortalPermissionResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllAdminPortalPermission($page: Float!, $limit: Float!) {
          findAllAdminPortalPermission(page: $page, limit: $limit) {
            id,
            userId,
            permissionId,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          page: getAdminPortalPermissionRequest.page,
          limit: getAdminPortalPermissionRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Get admin portal permission service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Get admin portal permission service error:", error);
      throw error;
    }
  },

  createAdminPortalPermission: async (
    createAdminPortalPermissionRequest: CreateAdminPortalPermissionRequestType
  ): Promise<Response<CreateAdminPortalPermissionResponseType>> => {
    try {
      const url: string = BASE_URL;
      console.log(
        "service log",
        createAdminPortalPermissionRequest.permissionId
      );
      const jsonData = {
        query: `mutation CreateAdminPortalPermission (
          $userId: Int!,
          $permissionId: [Int!]!
        ) {
          createAdminPortalPermission(
          createAdminPortalPersmissionInput: { 
            userId: $userId,  
            permissionId: $permissionId, 
          }
        ) {
            id,
            userId,
            permissionId,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          userId: parseInt(
            createAdminPortalPermissionRequest.userId.toString()
          ),
          permissionId: createAdminPortalPermissionRequest.permissionId,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Create admin portal permission service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Create admin portal permission service error:", error);
      throw error;
    }
  },

  editAdminPortalPermission: async (
    editAdminPortalPermissionRequest: EditAdminPortalPermissionRequestType
  ): Promise<Response<EditAdminPortalPermissionResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation UpdateAdminPortalPermission(
          $id: Int!,
          $userId: Int!,
          $permissionId: [Int!]!,
        ) {
          updateAdminPortalPermission(
            updateAdminPortalPersmissionInput: {
              id: $id,
              userId: $userId,  
              permissionId: $permissionId, 
            }
          ) {
            id,
            userId,
            permissionId,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          id: editAdminPortalPermissionRequest.id,
          userId: parseInt(editAdminPortalPermissionRequest.userId.toString()),
          permissionId: editAdminPortalPermissionRequest.permissionId,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Edit admin portal permission service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Edit admin portal permission service error:", error);
      throw error;
    }
  },

  deleteAdminPortalPermission: async (
    deleteAdminPortalPermissionRequest: DeleteAdminPortalPermissionRequestType
  ): Promise<Response<DeleteAdminPortalPermissionResponseType>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `mutation RemoveAdminPortalPermission($id: Float!) {
                  removeAdminPortalPermission(id: $id) {
                    id,
                    userId,
                    permissionId,
                    createdAt,
                    updateAt,
                  }
                }`,
        variables: { id: deleteAdminPortalPermissionRequest.id },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Delete admin portal permission service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Delete admin portal permission service error:", error);
      throw error;
    }
  },
};
