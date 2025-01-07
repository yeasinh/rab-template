"use server";

import { cookies } from "next/headers";

export async function setToken(token, menus, userType, id) {
  cookies().set("token", token);
  cookies().set("menus", JSON.stringify(menus));
  cookies().set("userType", JSON.stringify(userType));
  cookies().set("id", JSON.stringify(id));
}

export async function removeToken() {
  cookies().delete("token");
  cookies().delete("menus");
  cookies().delete("userType");
  cookies().delete("id");
}
