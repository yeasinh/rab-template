import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetBannerRequestType,
  GetBannerResponseType,
} from "./banner.service.type";

export const bannerService = {
  getBanner: async (
    getBannerRequest: GetBannerRequestType
  ): Promise<Response<GetBannerResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllAddsBanner($page: Float!, $limit:Float!) {
        findAllAddsBanner(page: $page, limit: $limit){
          id,
          bannerFilePath,
          isPublished,
          createdAt,
          updateAt,
         }
       }`,
        variables: {
          page: getBannerRequest.page,
          limit: getBannerRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Response of get banner service:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
};
