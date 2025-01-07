import { Response } from "../type";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
} from "./auth.service.type";
import { client as axiosClient, BASE_URL } from "../client";

export const authService = {
  login: async (
    loginRequest: LoginRequest
  ): Promise<Response<LoginResponse>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `mutation($email: String!, $password: String!) {
         login(
            data: {
                email: $email
                password: $password
              }
            )
          {
            name,
            token,
            permissionId,
            permissions{id, viewPermission, editPermission, deletePermission},
            menus{id, url},
            userType,
            id,
          }
        }`,
        variables: {
          email: `${loginRequest.username}`,
          password: `${loginRequest.password}`,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Login service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },

  logout: async (): Promise<Response<any>> => {
    try {
      const url: string = "/logout";
      const response = await axiosClient.get(url);
      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },

  forgotPassword: async (
    forgotPasswordRequest: ForgotPasswordRequest
  ): Promise<Response<ForgotPasswordResponse>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `mutation ForgotPassword($email: String!) {
         forgotPassword(email: $email)
          {
            firstName,
            lastName,
            email,
            password,
            userType,
            rememberToken,
            emailVarifiedAt,
          }
        }`,
        variables: {
          email: `${forgotPasswordRequest.email}`,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Forgot password service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },

  changePassword: async (
    changePasswordRequest: ChangePasswordRequest
  ): Promise<Response<ChangePasswordResponse>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `mutation ChangePassword(
            $email: String!,
            $password: String!,
            $rememberToken: String!
          ) {
            changePassword(
              changePasswordInput: {
                email: $email,
                password: $password,
                rememberToken: $rememberToken,
              }
          ) {
            firstName,
            lastName,
            email,
            password,
            userType,
            rememberToken,
            emailVarifiedAt,
          }
        }`,
        variables: {
          email: `${changePasswordRequest.email}`,
          password: `${changePasswordRequest.password}`,
          rememberToken: `${changePasswordRequest.rememberToken}`,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Change password service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
};
