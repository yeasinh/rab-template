import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetQuickContactResponseType,
  CreateQuickContactRequestType,
  EditQuickContactRequestType,
  EditQuickContactResponseType,
  DeleteQuickContactRequestType,
  DeleteQuickContactResponseType,
  GetQuickContactRequestType,
  CreateQuickContactResponseType,
} from "./quickContact.service.type";

export const quickContactService = {
  getQuickContact: async (
    getQuickContactRequest: GetQuickContactRequestType
  ): Promise<Response<GetQuickContactResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllQuickContact($page: Float!, $limit: Float!) {
          findAllQuickContact(page: $page, limit: $limit) {
            id,
            name,
            mobileNo,
            email,
            nid,
            message,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          page: getQuickContactRequest.page,
          limit: getQuickContactRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Get quick contact service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Get quick contact service error:", error);
      throw error;
    }
  },

  createQuickContact: async (
    createQuickContactRequest: CreateQuickContactRequestType
  ): Promise<Response<CreateQuickContactResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation CreateQuickContact(
          $name: String!,
          $mobileNo: String!, 
          $email: String!, 
          $nid: String!, 
          $message: String!
        ){
          createQuickContact(
          createQuickContactInput: { 
            name: $name,  
            mobileNo: $mobileNo, 
            email: $email, 
            nid: $nid, 
            message: $message, 
          }
        ) {
            id,
            name,
            mobileNo,
            email,
            nid,
            message,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          name: createQuickContactRequest.name,
          mobileNo: createQuickContactRequest.mobileNo,
          email: createQuickContactRequest.email,
          nid: createQuickContactRequest.nid,
          message: createQuickContactRequest.message,
        },
      };

      const response = await axiosClient.post(url, jsonData);
      console.log("Create quick contact service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Create quick contact service error:", error);
      throw error;
    }
  },

  editQuickContact: async (
    editQuickContactRequest: EditQuickContactRequestType
  ): Promise<Response<EditQuickContactResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation UpdateQuickContact(
          $id: Int!,
          $name: String!,
          $mobileNo: String!, 
          $email: String!, 
          $nid: String!, 
          $message: String!, 
        ) {
          updateQuickContact(
            updateQuickContactInput: {
              name: $name,  
              mobileNo: $mobileNo, 
              email: $email, 
              nid: $nid, 
              message: $message, 
            }
          ) {
            id,
            name,
            mobileNo,
            email,
            nid,
            message,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          id: editQuickContactRequest.id,
          name: editQuickContactRequest.name,
          mobileNo: editQuickContactRequest.mobileNo,
          email: editQuickContactRequest.email,
          nid: editQuickContactRequest.nid,
          message: editQuickContactRequest.message,
        },
      };

      const response = await axiosClient.post(url, jsonData);
      console.log("Edit quick contact service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Edit quick contact service error:", error);
      throw error;
    }
  },

  deleteQuickContact: async (
    deleteQuickContactRequest: DeleteQuickContactRequestType
  ): Promise<Response<DeleteQuickContactResponseType>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `mutation RemoveQuickContact($id: Float!) {
                  removeQuickContact(id: $id) {
                    id,
                    name,
                    mobileNo,
                    email,
                    nid,
                    message,
                    createdAt,
                    updateAt,
                  }
                }`,
        variables: { id: deleteQuickContactRequest.id },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Delete quick contact service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Delete quick contact service error:", error);
      throw error;
    }
  },
};
