import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetPermissionResponseType,
  CreatePermissionRequestType,
  EditPermissionRequestType,
  EditPermissionResponseType,
  DeletePermissionRequestType,
  DeletePermissionResponseType,
  GetPermissionRequestType,
  CreatePermissionResponseType,
} from "./permission.service.type";

export const permissionService = {
  getPermission: async (
    getPermissionRequest: GetPermissionRequestType
  ): Promise<Response<GetPermissionResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllPermission($page: Float!, $limit: Float!) {
          findAllPermission(page: $page, limit: $limit) {
            id,
            menuId,
            viewPermission,
            deletePermission,
            editPermission,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          page: getPermissionRequest.page,
          limit: getPermissionRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Get permission service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Get permission service error:", error);
      throw error;
    }
  },

  createPermission: async (
    createPermissionRequest: CreatePermissionRequestType
  ): Promise<Response<CreatePermissionResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation CreatePermission (
          $menuId: Int!,
          $viewPermission: Check!, 
          $deletePermission: Check!,
          $editPermission: Check!
        ){
          createPermission(
          createPermissionInput: { 
            menuId: $menuId,  
            viewPermission: $viewPermission, 
            deletePermission: $deletePermission,
            editPermission: $editPermission,
          }
        ) {
            id,
            menuId,
            viewPermission,
            deletePermission,
            editPermission,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          menuId: parseInt(createPermissionRequest.menuId.toString()),
          viewPermission: createPermissionRequest.viewPermission,
          deletePermission: createPermissionRequest.deletePermission,
          editPermission: createPermissionRequest.editPermission,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Create permission service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Create permission service error:", error);
      throw error;
    }
  },

  editPermission: async (
    editPermissionRequest: EditPermissionRequestType
  ): Promise<Response<EditPermissionResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation UpdatePermission(
          $id: Int!,
          $menuId: Int!,
          $viewPermission: Check!, 
          $deletePermission: Check!,
          $editPermission: Check!
        ) {
          updatePermission(
            updatePermissionInput: {
              id: $id,
              menuId: $menuId,  
              viewPermission: $viewPermission, 
              deletePermission: $deletePermission,
              editPermission: $editPermission,
            }
          ) {
            id,
            menuId,
            viewPermission,
            deletePermission,
            editPermission,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          id: editPermissionRequest.id,
          menuId: parseInt(editPermissionRequest.menuId.toString()),
          viewPermission: editPermissionRequest.viewPermission,
          deletePermission: editPermissionRequest.deletePermission,
          editPermission: editPermissionRequest.editPermission,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Edit permission service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Edit permission service error:", error);
      throw error;
    }
  },

  deletePermission: async (
    deletePermissionRequest: DeletePermissionRequestType
  ): Promise<Response<DeletePermissionResponseType>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `mutation RemovePermission($id: Float!) {
                  removePermission(id: $id) {
                    id,
                    menuId,
                    viewPermission,
                    deletePermission,
                    editPermission,
                    createdAt,
                    updateAt,
                  }
                }`,
        variables: { id: deletePermissionRequest.id },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Delete permission service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Delete permission service error:", error);
      throw error;
    }
  },
};
