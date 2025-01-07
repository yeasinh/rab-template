import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetOpinionResponseType,
  CreateOpinionRequestType,
  EditOpinionRequestType,
  EditOpinionResponseType,
  DeleteOpinionRequestType,
  DeleteOpinionResponseType,
  GetOpinionRequestType,
  CreateOpinionResponseType,
} from "./opinion.service.type";

export const opinionService = {
  getOpinion: async (
    getOpinionRequest: GetOpinionRequestType
  ): Promise<Response<GetOpinionResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllOpinion($page: Float!, $limit: Float!) {
          findAllOpinion(page: $page, limit: $limit) {
            id,
            name,
            email,
            mobileNo,
            nid,
            description,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          page: getOpinionRequest.page,
          limit: getOpinionRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Get opinion service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Get opinion service error:", error);
      throw error;
    }
  },

  createOpinion: async (
    createOpinionRequest: CreateOpinionRequestType
  ): Promise<Response<CreateOpinionResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation Createopinion (
          $name: String!,
          $email: String!, 
          $mobileNo: String!,
          $nid: String!,
          $description: String!,
        ){
          createOpinion(
          createOpinionInput: { 
            name:  $name,  
            email:  $email, 
            mobileNo: $mobileNo,
            nid: $nid,
            description: $description,
          }
        ) {
            id,
            name,
            email,
            mobileNo,
            nid,
            description,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          name: createOpinionRequest.name,
          email: createOpinionRequest.email,
          mobileNo: createOpinionRequest.mobileNo,
          nid: createOpinionRequest.nid,
          description: createOpinionRequest.description,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Create opinion service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Create opinion service error:", error);
      throw error;
    }
  },

  editOpinion: async (
    editOpinionRequest: EditOpinionRequestType
  ): Promise<Response<EditOpinionResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation UpdateOpinion(
          $id: Int!,
          $name: String!,
          $email: String!, 
          $mobileNo: String!,
          $nid: String!,
          $description: String!,
        ) {
          updateOpinion(
            updateOpinionInput: {
              id: $id,
              name:  $name,  
              email:  $email, 
              mobileNo: $mobileNo,
              nid: $nid,
              description: $description,
            }
          ) {
            id,
            name,
            email,
            mobileNo,
            nid,
            description,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          id: editOpinionRequest.id,
          name: editOpinionRequest.name,
          email: editOpinionRequest.email,
          mobileNo: editOpinionRequest.mobileNo,
          nid: editOpinionRequest.nid,
          description: editOpinionRequest.description,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Edit opinion service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Edit opinion service error:", error);
      throw error;
    }
  },

  deleteOpinion: async (
    deleteOpinionRequest: DeleteOpinionRequestType
  ): Promise<Response<DeleteOpinionResponseType>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `mutation RemoveOpinion($id: Float!) {
                  removeOpinion(id: $id) {
                    id,
                    name,
                    email,
                    mobileNo,
                    nid,
                    description,
                    createdAt,
                    updateAt,
                  }
                }`,
        variables: { id: deleteOpinionRequest.id },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Delete opinion service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Delete opinion service error:", error);
      throw error;
    }
  },
};
