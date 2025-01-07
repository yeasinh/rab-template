import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import { GetContactRequest, GetContactResponse } from "./contact.service.type";

export const contactService = {
  getContact: async (
    getContactRequest: GetContactRequest
  ): Promise<Response<GetContactResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllConatctInfo($page: Float!, $limit:Float!) {
        findAllConatctInfo(page: $page, limit: $limit){
          id,
          addressEn,
          addressBn,
          addressIconPath,
          phoneEn,
          phoneBn,
          phoneIconPath,
          mobileEn,
          mobileBn,
          mobileIconPath,
          faxEn,
          faxBn,
          faxIconPath,
          createdAt,
          updateAt,
         }
       }`,
        variables: {
          page: getContactRequest.page,
          limit: getContactRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Response of get contacts service:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
};
