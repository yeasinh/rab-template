"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/rab-logo.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { UserStatus } from "@lib/services/user/user.service.type";

const menus = [
  {
    name: "Dashboard",
    icon: "fa-solid fa-gauge-high",
    link: "/pages/dashboard",
    submenus: [],
  },
  {
    name: "Publication",
    icon: "fa-solid fa-book",
    link: "/pages/publication",
    submenus: [],
  },
  {
    name: "FAQ",
    icon: "fa-solid fa-concierge-bell",
    link: "/pages/faq",
    submenus: [],
  },
];

export default function SideBar() {
  const isToggled = useSelector((state: RootState) => state.sidebar?.isToggled);
  console.log("isToggled", isToggled);

  const userType = useSelector(
    (state: RootState) => state.login.loginResponse?.login.userType
  );

  const adminMenus = useSelector(
    (state: RootState) => state.login.loginResponse?.login.menus
  );

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  const filteredMenus = menus
    .map((menu) => {
      // Filter the submenus based on adminMenus
      const filteredSubmenus = menu.submenus.filter((submenu) =>
        adminMenus?.some((adminMenu) => adminMenu.url === submenu.link)
      );

      // Include the menu if it matches adminMenus or has matching submenus
      if (
        adminMenus?.some((adminMenu) => adminMenu.url === menu.link) ||
        filteredSubmenus.length > 0
      ) {
        return {
          ...menu,
          submenus: filteredSubmenus,
        };
      }

      return null;
    })
    .filter((menu) => menu !== null);

  const renderMenu = userType === UserStatus.ADMIN ? menus : filteredMenus;

  return (
    <div
      className={
        isToggled ? "sidebar-wrapper mob-sidebar-show" : "sidebar-wrapper"
      }
    >
      <div className="logo-details d-none d-sm-block">
        <Image src={logo} alt="rab logo" width={40} height={40} />
        <span className="logo_name">Rapid Action Battalion</span>
      </div>
      <div className="sidebar">
        <ul className="nav-links">
          {renderMenu.map((menu, index) => (
            <li key={index}>
              <div className="iocn-link" onClick={() => toggleMenu(index)}>
                <Link href={menu.link ? menu.link : ""}>
                  <i className={menu.icon}></i>
                  <span className="link_name">{menu.name}</span>
                </Link>
                {menu.submenus.length > 0 && (
                  <i
                    className={`bx ${
                      openMenu === index ? "bxs-chevron-up" : "bxs-chevron-down"
                    } arrow`}
                  ></i>
                )}
              </div>
              <ul
                className={`sub-menu ${
                  openMenu === index ? "d-block" : "d-none"
                }`}
              >
                {menu.submenus.length > 0 &&
                  menu.submenus.map((submenu, index: number) => (
                    <li key={index}>
                      <Link className="link_name" href={submenu.link}>
                        {submenu.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
