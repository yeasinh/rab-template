import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetMediaResponseType,
  CreateMediaRequestType,
  EditMediaRequestType,
  EditMediaResponseType,
  DeleteMediaRequestType,
  DeleteMediaResponseType,
  GetMediaRequestType,
  CreateMediaResponseType,
} from "./media.service.type";

export const mediaService = {
  getMedia: async (
    getMediaRequest: GetMediaRequestType
  ): Promise<Response<GetMediaResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllMedia($page: Float!, $limit: Float!) {
          findAllMedia(page: $page, limit: $limit) {
            id,
            titleBn,
            titleEn,
            subTitleBn,
            subTitleEn,
            mediaFilePath,
            mediaType,
            isPublished,
            createdAt,
            updateAt,
          }
        }`,
        variables: { page: getMediaRequest.page, limit: 100000000 },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Get media service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Get media service error:", error);
      throw error;
    }
  },

  createMedia: async (
    createMediaRequest: CreateMediaRequestType
  ): Promise<Response<CreateMediaResponseType>> => {
    try {
      const url: string = BASE_URL;
      const formData = new FormData();

      const jsonData = {
        query: `mutation CreateMedia (
          $titleBn: String!,
          $titleEn: String!, 
          $subTitleBn: String!, 
          $subTitleEn: String!, 
          $mediaFilePath: Upload!, 
          $mediaType: MediaType!,
          $isPublished: Publish!
        ){
          createMedia(
          createMediaInput: { 
            titleBn: $titleBn,  
            titleEn: $titleEn, 
            subTitleBn: $subTitleBn, 
            subTitleEn: $subTitleEn, 
            mediaFilePath: $mediaFilePath, 
            mediaType: $mediaType,
            isPublished: $isPublished,
          }
        ) {
            id,
            titleBn,
            titleEn,
            subTitleBn,
            subTitleEn,
            mediaFilePath,
            mediaType,
            isPublished,
            isPublished,
          }
        }`,
        variables: {
          titleBn: createMediaRequest.titleBn,
          titleEn: createMediaRequest.titleEn,
          subTitleBn: createMediaRequest.subTitleBn,
          subTitleEn: createMediaRequest.subTitleEn,
          mediaType: createMediaRequest.mediaType,
          isPublished: createMediaRequest.isPublished,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));
      formData.append("map", '{ "0": ["variables.mediaFilePath"] }');
      formData.append("0", createMediaRequest.mediaFilePath);

      const response = await axiosFormDataClient.post(url, formData);
      console.log("Create media service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Create media service error:", error);
      throw error;
    }
  },

  editMedia: async (
    editMediaRequest: EditMediaRequestType
  ): Promise<Response<EditMediaResponseType>> => {
    try {
      const url: string = BASE_URL;
      const formData = new FormData();
      const jsonData = {
        query: `mutation (
          $id: Int!,
          $titleBn: String!,
          $titleEn: String!, 
          $subTitleBn: String!, 
          $subTitleEn: String!, 
          $mediaFilePath: Upload!, 
          $mediaType: MediaType!, 
          $isPublished: Publish!
        ) {
          updateMedia(
            updateMediaInput: {
              id: $id,
              titleBn: $titleBn,  
              titleEn: $titleEn, 
              subTitleBn: $subTitleBn, 
              subTitleEn: $subTitleEn, 
              mediaFilePath: $mediaFilePath, 
              mediaType: $mediaType,
              isPublished: $isPublished,
            }
          ) {
            id,
            titleBn,
            titleEn,
            subTitleBn,
            subTitleEn,
            mediaFilePath,
            mediaType,
            isPublished,
            isPublished,
          }
        }`,
        variables: {
          id: editMediaRequest.id,
          titleBn: editMediaRequest.titleBn,
          titleEn: editMediaRequest.titleEn,
          subTitleBn: editMediaRequest.subTitleBn,
          subTitleEn: editMediaRequest.subTitleEn,
          mediaType: editMediaRequest.mediaType,
          isPublished: editMediaRequest.isPublished,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      if (editMediaRequest.mediaFilePath) {
        formData.append("map", '{ "0": ["variables.mediaFilePath"] }');
        formData.append("0", editMediaRequest.mediaFilePath);
      }

      const response = await axiosFormDataClient.post(url, formData);
      console.log("Edit media service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Edit media service error:", error);
      throw error;
    }
  },

  deleteMedia: async (
    deleteMediaRequest: DeleteMediaRequestType
  ): Promise<Response<DeleteMediaResponseType>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `mutation($id: Float!) {
                  removeMedia(id: $id) {
                    id,
                    titleBn,
                    titleEn,
                    subTitleBn,
                    subTitleEn,
                    mediaFilePath,
                    mediaType,
                    isPublished,
                    isPublished,
                  }
                }`,
        variables: { id: deleteMediaRequest.id },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Delete media service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Delete media service error:", error);
      throw error;
    }
  },
};
