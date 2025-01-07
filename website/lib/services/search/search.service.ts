import { client as axiosClient, BASE_URL } from "@services/client";
import { Response } from "@services/type";
import {
  SearchMemberResult,
  SearchMobileAppFeatureResult,
  SearchNocResult,
  SearchObjectiveResult,
  SearchOverviewResult,
  SearchQuery,
} from "./search.service.type";

export const searchService = {
  searchOverview: async (
    searchOverviewRequest: SearchQuery
  ): Promise<Response<SearchOverviewResult>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query SerchOverView($searchText: String!) {
          serchOverView(searchText: $searchText) {
            dgNameBn,
            dgNameEn,
            descriptionBn,
            descriptionEn,
            titleBn,
            titleEn,
            subTitleBn,
            subTitleEn,
           }
         }`,
        variables: {
          searchText: searchOverviewRequest.searchText,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Response of search overview service:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },

  searchObjective: async (
    searchObjectiveRequest: SearchQuery
  ): Promise<Response<SearchObjectiveResult>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query SerchRabRoleOrAdviceItem($searchText: String!) {
          serchRabRoleOrAdviceItem(searchText: $searchText) {
            nameBn,
            nameEn,
           }
         }`,
        variables: {
          searchText: searchObjectiveRequest.searchText,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Response of search objective service:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },

  searchMobileAppFeature: async (
    searchMobileAppFeatureRequest: SearchQuery
  ): Promise<Response<SearchMobileAppFeatureResult>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query searchMobileAppFeature($searchText: String!) {
          searchMobileAppFeature(searchText: $searchText) {
            nameBn,
            nameEn,
            descriptionBn,
            descriptionEn,
           }
         }`,
        variables: {
          searchText: searchMobileAppFeatureRequest.searchText,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Response of search mobile app feature service:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },

  searchMember: async (
    searchMemberRequest: SearchQuery
  ): Promise<Response<SearchMemberResult>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query serchMember($searchText: String!) {
          serchMember(searchText: $searchText) {
            nameBn,
            nameEn,
            designationBn,
            designationEn,
           }
         }`,
        variables: {
          searchText: searchMemberRequest.searchText,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Response of search member service:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },

  searchNoc: async (
    searchNocRequest: SearchQuery
  ): Promise<Response<SearchNocResult>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query serchNoc($searchText: String!) {
          serchNoc(searchText: $searchText) {
            nameBn,
            nameEn,
           }
         }`,
        variables: {
          searchText: searchNocRequest.searchText,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Response of search noc service:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
};
