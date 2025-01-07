import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetActivityRequestType,
  GetActivityResponseType,
} from "./activity.service.type";

export const activityService = {
  getActivity: async (
    getActivityRequest: GetActivityRequestType
  ): Promise<Response<GetActivityResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllActivity($page: Float!, $limit:Float!) {
        findAllActivity(page: $page, limit: $limit){
          id,
          headingEn,
          headingBn,
          descriptionBn,
          descriptionEn,
          acitivityDate,
          activityImagePath,
          isPublished,
          createdAt,
          updateAt,
         }
       }`,
        variables: {
          page: getActivityRequest.page,
          limit: 100000000,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Response of get Activity service:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
};
