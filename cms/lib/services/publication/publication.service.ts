import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetPublicationResponseType,
  CreatePublicationRequestType,
  EditPublicationRequestType,
  EditPublicationResponseType,
  DeletePublicationRequestType,
  DeletePublicationResponseType,
  GetPublicationRequestType,
  CreatePublicationResponseType,
} from "./publication.service.type";

export const publicationService = {
  getPublication: async (
    getPublicationRequest: GetPublicationRequestType
  ): Promise<Response<GetPublicationResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllPublication($page: Float!, $limit: Float!) {
          findAllPublication(page: $page, limit: $limit) {
            id,
            titleBn,
            titleEn,
            authorNameBn,
            authorNameEn,
            publisherBn,
            publisherEn,
            publicationYear,
            publicationFilePath,
            isPreviewButton,
            isDownloadButton,
            isPublished,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          page: getPublicationRequest.page,
          limit: getPublicationRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Get publication service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Get publication service error:", error);
      throw error;
    }
  },

  createPublication: async (
    createPublicationRequest: CreatePublicationRequestType
  ): Promise<Response<CreatePublicationResponseType>> => {
    try {
      const url: string = BASE_URL;
      const formData = new FormData();

      const jsonData = {
        query: `mutation CreatePublication(
          $titleBn: String!,
          $titleEn: String!, 
          $authorNameBn: String!, 
          $authorNameEn: String!, 
          $publisherBn: String!,
          $publisherEn: String!,
          $publicationYear: String!,
          $publicationFilePath: Upload!, 
          $isPreviewButton: Check!,
          $isDownloadButton: Check!,
          $isPublished: Publish!
        ){
          createPublication(
          createPublicationInput: { 
            titleBn: $titleBn,  
            titleEn: $titleEn, 
            authorNameBn: $authorNameBn, 
            authorNameEn: $authorNameEn, 
            publisherBn: $publisherBn, 
            publisherEn: $publisherEn,
            publicationYear: $publicationYear,
            publicationFilePath: $publicationFilePath,
            isPreviewButton: $isPreviewButton,
            isDownloadButton: $isDownloadButton,
            isPublished: $isPublished,
          }
        ) {
            id,
            titleBn,
            titleEn,
            authorNameBn,
            authorNameEn,
            publisherBn,
            publisherEn,
            publicationYear,
            publicationFilePath,
            isPreviewButton,
            isDownloadButton,
            isPublished,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          titleBn: createPublicationRequest.titleBn,
          titleEn: createPublicationRequest.titleEn,
          authorNameBn: createPublicationRequest.authorNameBn,
          authorNameEn: createPublicationRequest.authorNameEn,
          publisherBn: createPublicationRequest.publisherBn,
          publisherEn: createPublicationRequest.publisherEn,
          publicationYear: new Date(createPublicationRequest.publicationYear),
          isPreviewButton: createPublicationRequest.isPreviewButton,
          isDownloadButton: createPublicationRequest.isDownloadButton,
          isPublished: createPublicationRequest.isPublished,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));
      formData.append("map", '{ "0": ["variables.publicationFilePath"] }');
      formData.append("0", createPublicationRequest.publicationFilePath);

      const response = await axiosFormDataClient.post(url, formData);
      console.log("Create publication service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Create publication service error:", error);
      throw error;
    }
  },

  editPublication: async (
    editPublicationRequest: EditPublicationRequestType
  ): Promise<Response<EditPublicationResponseType>> => {
    try {
      const url: string = BASE_URL;
      const formData = new FormData();
      const jsonData = {
        query: `mutation UpdatePublication(
          $id: Int!,
          $titleBn: String!, 
          $titleEn: String!, 
          $authorNameBn: String!, 
          $authorNameEn: String!, 
          $publisherBn: String!,
          $publisherEn: String!,
          $publicationYear: String!,
          $publicationFilePath: Upload!, 
          $isPreviewButton: Check!,
          $isDownloadButton: Check!,
          $isPublished: Publish!
        ) {
          updatePublication(
            updatePublicationInput: {
            id: $id
            titleBn: $titleBn,  
            titleEn: $titleEn, 
            authorNameBn: $authorNameBn, 
            authorNameEn: $authorNameEn, 
            publisherBn: $publisherBn, 
            publisherEn: $publisherEn,
            publicationYear: $publicationYear,
            publicationFilePath: $publicationFilePath,
            isPreviewButton: $isPreviewButton,
            isDownloadButton: $isDownloadButton,
            isPublished: $isPublished,
            }
          ) {
            id,
            titleBn,
            titleEn,
            authorNameBn,
            authorNameEn,
            publisherBn,
            publisherEn,
            publicationYear,
            publicationFilePath,
            isPreviewButton,
            isDownloadButton,
            isPublished,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          id: editPublicationRequest.id,
          titleBn: editPublicationRequest.titleBn,
          titleEn: editPublicationRequest.titleEn,
          authorNameBn: editPublicationRequest.authorNameBn,
          authorNameEn: editPublicationRequest.authorNameEn,
          publisherBn: editPublicationRequest.publisherBn,
          publisherEn: editPublicationRequest.publisherEn,
          publicationYear: new Date(editPublicationRequest.publicationYear),
          isPreviewButton: editPublicationRequest.isPreviewButton,
          isDownloadButton: editPublicationRequest.isDownloadButton,
          isPublished: editPublicationRequest.isPublished,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      if (editPublicationRequest.publicationFilePath) {
        formData.append("map", '{ "0": ["variables.publicationFilePath"] }');
        formData.append("0", editPublicationRequest.publicationFilePath);
      }

      const response = await axiosFormDataClient.post(url, formData);
      console.log("Edit publication service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Edit publication service error:", error);
      throw error;
    }
  },

  deletePublication: async (
    deletePublicationRequest: DeletePublicationRequestType
  ): Promise<Response<DeletePublicationResponseType>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `mutation RemovePublication($id: Float!) {
                  removePublication(id: $id) {
                    id,
                    titleBn,
                    titleEn,
                    authorNameBn,
                    authorNameEn,
                    publisherBn,
                    publisherEn,
                    publicationYear,
                    publicationFilePath,
                    isPreviewButton,
                    isDownloadButton,
                    isPublished,
                    createdAt,
                    updateAt,
                  }
                }`,
        variables: { id: deletePublicationRequest.id },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Delete publication service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Delete publication service error:", error);
      throw error;
    }
  },
};
