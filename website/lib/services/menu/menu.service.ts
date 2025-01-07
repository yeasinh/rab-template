import { MenuRequest, MenuResponse } from "@services/menu/menu.service.type";
import { client as axiosClient, BASE_URL } from "@services/client";
import { Response } from "@services/type";

export const menuService = {
  menu: async (menuRequest: MenuRequest): Promise<Response<MenuResponse>> => {
    try {
      const url: string = BASE_URL;
      const response = await axiosClient.post(
        url,
        JSON.stringify({
          query: `query MenuItems($page: Float!, $limit:Float!){
          menuItems(page: $page, limit: $limit){
            id,
            labelBn,
            labelEn,
            link,
            parent,
            sort,
            class,
            menu,
            depth
            }
          }`,
          variables: { page: menuRequest.page, limit: menuRequest.limit },
        })
      );
      console.log("Response of menu service:", response);
      return response?.data;
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  },
};
