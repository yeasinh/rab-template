"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { UserStatus } from "@lib/services/user/user.service.type";

let allowedRoutes = [];

export async function middleware(request: NextRequest) {
  const accessToken: string = request.cookies.get("token")?.value;
  const menus: any = cookies().get("menus")?.value;
  const userType: any = cookies().get("userType")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && userType && JSON.parse(userType) !== UserStatus.ADMIN) {
    const parsedMenus = JSON.parse(menus);
    allowedRoutes = [...parsedMenus.map((menu) => menu.url)];

    if (allowedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(parsedMenus[0]?.url, request.url));
    }
  }

  if (accessToken && userType && JSON.parse(userType) == UserStatus.ADMIN) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/pages/:path*"],
};
