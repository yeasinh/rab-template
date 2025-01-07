import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetLogoAndTitleRequest,
  GetLogoAndTitleResponse,
} from "./logoAndTitle.service.type";

export const logoAndTitleService = {
  getLogoAndTitle: async (
    getLogoAndTitleRequest: GetLogoAndTitleRequest
  ): Promise<Response<GetLogoAndTitleResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllLogoAndTitle($page: Float!, $limit:Float!) {
            findAllLogoAndTitle(page: $page, limit: $limit){
              id,
              titleEn,
              titleBn,
              headerLogoPath,
              isPublished,
              createdAt,
              updateAt,
             }
           }`,
        variables: {
          page: getLogoAndTitleRequest.page,
          limit: getLogoAndTitleRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Response of find logo and titles service:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
};
