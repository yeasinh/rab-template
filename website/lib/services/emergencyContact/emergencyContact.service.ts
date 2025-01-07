import { client as axiosClient, BASE_URL } from "@services/client";
import { Response } from "@services/type";
import {
  GetEmergencyContactRequest,
  GetEmergencyContactResponse,
} from "./emergencyContact.service.type";

export const emergencyContactService = {
  getEmergencyContact: async (
    getEmergencyContactRequest: GetEmergencyContactRequest
  ): Promise<Response<GetEmergencyContactResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAllEmergencyConatct($page: Float!, $limit:Float!) {
        findAllEmergencyConatct(page: $page, limit: $limit){
          id,
          titleEn,
          titleBn,
          phoneNumberEn,
          phoneNumberBn,
          mobileNumberEn,
          mobileNumberBn,
          isPublished,
          createdAt,
          updateAt,
         }
       }`,
        variables: {
          page: getEmergencyContactRequest.page,
          limit: getEmergencyContactRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Response of find emergency contacts service:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
};
