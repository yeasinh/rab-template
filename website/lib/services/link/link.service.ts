import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetLinkTitleRequest,
  GetLinkTitleResponse,
  GetLinkItemRequest,
  GetLinkItemResponse,
} from "./link.service.type";

export const linkService = {
  getLinkTitle: async (
    getLinkTitleRequest: GetLinkTitleRequest
  ): Promise<Response<GetLinkTitleResponse>> => {
    try {
      const url: string = BASE_URL;
      const response = await axiosClient.post(
        url,
        JSON.stringify({
          query: `query FindAllQuickLinkInfo($page: Float!, $limit:Float!) {
                   findAllQuickLinkInfo(page: $page, limit: $limit){
                      id,
                      titleEn,
                      titleBn,
                      isWebsite,
                      createdAt,
                      updateAt,
                    }
                  }`,
          variables: {
            page: getLinkTitleRequest.page,
            limit: getLinkTitleRequest.limit,
          },
        })
      );
      console.log("Response of get link titles service:", response);
      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },

  getLinkItem: async (
    getLinkItemRequest: GetLinkItemRequest
  ): Promise<Response<GetLinkItemResponse>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `query FindAllQuickLink($page: Float!, $limit:Float!) {
                   findAllQuickLink(page: $page, limit: $limit) {
                      id,
                      nameEn,
                      nameBn,
                      isWebsite,
                      iconPath,
                      url,
                      createdAt,
                      updateAt,
                    }
                  }`,
        variables: {
          page: getLinkItemRequest.page,
          limit: getLinkItemRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Response of get link items service:", response);
      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
};
