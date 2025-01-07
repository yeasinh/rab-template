import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetAdminMenuResponseType,
  CreateAdminMenuRequestType,
  EditAdminMenuRequestType,
  EditAdminMenuResponseType,
  DeleteAdminMenuRequestType,
  DeleteAdminMenuResponseType,
  GetAdminMenuRequestType,
  CreateAdminMenuResponseType,
} from "./adminMenu.service.type";

export const adminMenuService = {
  getAdminMenu: async (
    getAdminMenuRequest: GetAdminMenuRequestType
  ): Promise<Response<GetAdminMenuResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllAdminMenu($page: Float!, $limit: Float!) {
          findAllAdminMenu(page: $page, limit: $limit) {
            id,
            menuName,
            url,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          page: getAdminMenuRequest.page,
          limit: getAdminMenuRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Get admin menu service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Get admin menu service error:", error);
      throw error;
    }
  },

  createAdminMenu: async (
    createAdminMenuRequest: CreateAdminMenuRequestType
  ): Promise<Response<CreateAdminMenuResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation CreateAdminMenu (
          $menuName: String!,
          $url: String!, 
        ){
          createAdminMenu(
          createAdminMenuInput: { 
            menuName: $menuName,  
            url: $url, 
          }
        ) {
            id,
            menuName,
            url,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          menuName: createAdminMenuRequest.menuName,
          url: createAdminMenuRequest.url,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Create admin menu service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Create admin menu service error:", error);
      throw error;
    }
  },

  editAdminMenu: async (
    editAdminMenuRequest: EditAdminMenuRequestType
  ): Promise<Response<EditAdminMenuResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation UpdateAdminMenu(
          $id: Int!,
          $menuName: String!,
          $url: String!, 
        ) {
          updateAdminMenu(
            updateAdminMenuInput: {
              id: $id,
              menuName: $menuName,  
              url: $url, 
            }
          ) {
            id,
            menuName,
            url,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          id: editAdminMenuRequest.id,
          menuName: editAdminMenuRequest.menuName,
          url: editAdminMenuRequest.url,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Edit admin menu service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Edit admin menu service error:", error);
      throw error;
    }
  },

  deleteAdminMenu: async (
    deleteAdminMenuRequest: DeleteAdminMenuRequestType
  ): Promise<Response<DeleteAdminMenuResponseType>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `mutation RemoveAdminMenu($id: Float!) {
                  removeAdminMenu(id: $id) {
                    id,
                    menuName,
                    url,
                    createdAt,
                    updateAt,
                  }
                }`,
        variables: { id: deleteAdminMenuRequest.id },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Delete admin menu service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Delete admin menu service error:", error);
      throw error;
    }
  },
};
