import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetFaqResponseType,
  CreateFaqRequestType,
  EditFaqRequestType,
  EditFaqResponseType,
  DeleteFaqRequestType,
  DeleteFaqResponseType,
  GetFaqRequestType,
  CreateFaqResponseType,
} from "./faq.service.type";

export const faqService = {
  getFaq: async (
    getFaqRequest: GetFaqRequestType
  ): Promise<Response<GetFaqResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllFaq($page: Float!, $limit: Float!) {
          findAllFaq(page: $page, limit: $limit) {
            id,
            titleBn,
            titleEn,
            descriptionBn,
            descriptionEn,
            isPublished,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          page: getFaqRequest.page,
          limit: getFaqRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Get faq service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Get faq service error:", error);
      throw error;
    }
  },

  createFaq: async (
    createFaqRequest: CreateFaqRequestType
  ): Promise<Response<CreateFaqResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation Createfaq (
          $titleBn: String!,
          $titleEn: String!, 
          $descriptionBn: String!, 
          $descriptionEn: String!, 
          $isPublished: Publish!
        ){
          createFaq(
          createFaqInput: { 
            titleBn: $titleBn,  
            titleEn: $titleEn, 
            descriptionBn: $descriptionBn,
            descriptionEn: $descriptionEn, 
            isPublished: $isPublished,
          }
        ) {
            id,
            titleBn,
            titleEn,
            descriptionBn,
            descriptionEn,
            isPublished,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          titleBn: createFaqRequest.titleBn,
          titleEn: createFaqRequest.titleEn,
          descriptionBn: createFaqRequest.descriptionBn,
          descriptionEn: createFaqRequest.descriptionEn,
          isPublished: createFaqRequest.isPublished,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Create faq service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Create faq service error:", error);
      throw error;
    }
  },

  editFaq: async (
    editFaqRequest: EditFaqRequestType
  ): Promise<Response<EditFaqResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation UpdateFaq(
          $id: Int!,
          $titleBn: String!,
          $titleEn: String!, 
          $descriptionBn: String!, 
          $descriptionEn: String!, 
          $isPublished: Publish!
        ) {
          updateFaq(
            updateFaqInput: {
              id: $id,
              titleBn: $titleBn,  
              titleEn: $titleEn, 
              descriptionBn: $descriptionBn,
              descriptionEn: $descriptionEn,
              isPublished: $isPublished,
            }
          ) {
            id,
            titleBn,
            titleEn,
            descriptionBn,
            descriptionEn,
            isPublished,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          id: editFaqRequest.id,
          titleBn: editFaqRequest.titleBn,
          titleEn: editFaqRequest.titleEn,
          descriptionBn: editFaqRequest.descriptionBn,
          descriptionEn: editFaqRequest.descriptionEn,
          isPublished: editFaqRequest.isPublished,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Edit faq service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Edit faq service error:", error);
      throw error;
    }
  },

  deleteFaq: async (
    deleteFaqRequest: DeleteFaqRequestType
  ): Promise<Response<DeleteFaqResponseType>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `mutation RemoveFaq($id: Float!) {
                  removeFaq(id: $id) {
                    id,
                    titleBn,
                    titleEn,
                    descriptionBn,
                    descriptionEn,
                    isPublished,
                    createdAt,
                    updateAt,
                  }
                }`,
        variables: { id: deleteFaqRequest.id },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Delete faq service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Delete faq service error:", error);
      throw error;
    }
  },
};
