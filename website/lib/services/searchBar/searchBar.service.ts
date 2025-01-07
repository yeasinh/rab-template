import { client as axiosClient, BASE_URL } from "@services/client";
import { Response } from "@services/type";
import {
  GetSearchBarRequest,
  GetSearchBarResponse,
} from "./searchBar.service.type";

export const searchBarService = {
  getSearchBar: async (
    getSearchBarRequest: GetSearchBarRequest
  ): Promise<Response<GetSearchBarResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllSearchBarInfo($page: Float!, $limit:Float!) {
          findAllSearchBarInfo(page: $page, limit: $limit){
            id,
            placeHolderEn,
            placeHolderBn,
            createdAt,
            updateAt,
           }
         }`,
        variables: {
          page: getSearchBarRequest.page,
          limit: getSearchBarRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Response of find search bars service:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
};
