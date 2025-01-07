import {
  client as axiosClient,
  formDataClient as axiosFormDataClient,
  BASE_URL,
} from "@services/client";
import { Response } from "@services/type";
import {
  GetUserResponseType,
  CreateUserRequestType,
  EditUserRequestType,
  EditUserResponseType,
  DeleteUserRequestType,
  DeleteUserResponseType,
  GetUserRequestType,
  CreateUserResponseType,
} from "./user.service.type";

export const userService = {
  getUser: async (
    getUserRequest: GetUserRequestType
  ): Promise<Response<GetUserResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Users($page: Float!, $limit: Float!) {
          users(page: $page, limit: $limit) {
            id,
            firstName,
            lastName,
            email,
            password,
            userType,
            rememberToken,
            emailVarifiedAt,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          page: getUserRequest.page,
          limit: getUserRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Get user service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Get user service error:", error);
      throw error;
    }
  },

  createUser: async (
    createUserRequest: CreateUserRequestType
  ): Promise<Response<CreateUserResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation RegisterUser(
          $firstName: String!,
          $lastName: String!, 
          $email: String!, 
          $password: String!, 
          $userType: UserType!
        ){
          registerUser(
          createUserInput: { 
            firstName: $firstName,  
            lastName: $lastName, 
            email: $email, 
            password: $password, 
            userType: $userType, 
          }
        ) {
            id,
            firstName,
            lastName,
            email,
            password,
            userType,
            rememberToken,
            emailVarifiedAt,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          firstName: createUserRequest.firstName,
          lastName: createUserRequest.lastName,
          email: createUserRequest.email,
          password: createUserRequest.password,
          userType: createUserRequest.userType,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Create user service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Create user service error:", error);
      throw error;
    }
  },

  editUser: async (
    editUserRequest: EditUserRequestType
  ): Promise<Response<EditUserResponseType>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation UpdateUser(
          $id: Int!,
          $firstName: String!,
          $lastName: String!, 
          $email: String!, 
          $password: String!, 
          $userType: UserType!
        ) {
          updateUser(
            updateUserInput: {
            id: $id,
            firstName: $firstName,  
            lastName: $lastName, 
            email: $email, 
            password: $password, 
            userType: $userType, 
            }
          ) {
            id,
            firstName,
            lastName,
            email,
            password,
            userType,
            rememberToken,
            emailVarifiedAt,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          id: editUserRequest.id,
          firstName: editUserRequest.firstName,
          lastName: editUserRequest.lastName,
          email: editUserRequest.email,
          password: editUserRequest.password,
          userType: editUserRequest.userType,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Edit user service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Edit user service error:", error);
      throw error;
    }
  },

  deleteUser: async (
    deleteUserRequest: DeleteUserRequestType
  ): Promise<Response<DeleteUserResponseType>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `mutation RemoveUser($id: Int!) {
                  removeUser(id: $id) {
                    id,
                    firstName,
                    lastName,
                    email,
                    password,
                    userType,
                    rememberToken,
                    emailVarifiedAt,
                    createdAt,
                    updateAt,
                  }
                }`,
        variables: { id: deleteUserRequest.id },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      console.log("Delete user service response:", response);

      return response?.data;
    } catch (error) {
      console.log("Delete user service error:", error);
      throw error;
    }
  },
};
