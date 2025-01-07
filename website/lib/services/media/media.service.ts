import { client as axiosClient, BASE_URL } from "@services/client";
import { Response } from "@services/type";
import {
  GetMediaResponseType,
  GetMediaRequestType,
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
};
