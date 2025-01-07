"use client";

import "./Menu.scss";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useAppDispatch } from "@lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { menuActions } from "@lib/slices/menu/menu.slice";
import { IMenu } from "@lib/services/menu/menu.service.type";

const MobileMenu = () => {
  const menus = useSelector(
    (state: RootState) => state.menu.menuResponse?.menuItems
  );
  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      menuActions.menu({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  const mainMenus = menus?.filter((menu: IMenu) => menu.class === "Main Menu");
  const sortedMainMenus = [...(mainMenus || [])].sort(
    (a, b) => (a.sort || 0) - (b.sort || 0)
  );

  const subMenus = {};
  menus?.forEach((menu: IMenu) => {
    const { id, parent } = menu;

    if (!subMenus[id]) {
      subMenus[id] = null;
    }

    if (parent === 0) {
      return;
    }

    if (parent !== null) {
      if (!subMenus[parent]) {
        subMenus[parent] = [];
      }
      subMenus[parent].push(menu);
    }
  });

  // State to track open/closed submenus
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  // Toggle submenu open/close
  const toggleMenu = (id: string) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [id]: !prevOpenMenus[id],
    }));
  };

  return (
    <div className="offcanvas-body mobile-menu-body">
      <ul>
        {sortedMainMenus.map((menu: IMenu) => (
          <li key={menu.id} className={subMenus[menu.id] ? "dropdown" : ""}>
            <Link
              className="nav-link"
              href={menu.link}
              onClick={(e) => {
                if (subMenus[menu.id]) {
                  e.preventDefault();
                  toggleMenu(menu.id.toString());
                }
              }}
              aria-expanded={!!openMenus[menu.id]}
            >
              {isEnglish ? menu.labelEn : menu.labelBn}
              {subMenus[menu.id] && (
                <Icon
                  icon="iconamoon:arrow-down-2-duotone"
                  width="18px"
                  height="18px"
                />
              )}
            </Link>

            {subMenus[menu.id] && openMenus[menu.id] && (
              <ul className="dropdown-menu show">
                {subMenus[menu.id].map((subMenu: IMenu) => (
                  <li key={subMenu.id}>
                    <Link
                      className="dropdown-item"
                      href={subMenu.link}
                      onClick={(e) => {
                        if (subMenus[subMenu.id]) {
                          e.preventDefault();
                          toggleMenu(subMenu.id.toString());
                        }
                      }}
                      aria-expanded={!!openMenus[subMenu.id]}
                    >
                      {isEnglish ? subMenu.labelEn : subMenu.labelBn}
                      {subMenus[subMenu.id] && (
                        <Icon
                          icon="iconamoon:arrow-right-2-duotone"
                          width="18px"
                          height="18px"
                        />
                      )}
                    </Link>

                    {subMenus[subMenu.id] && openMenus[subMenu.id] && (
                      <ul className="dropdown-menu show">
                        {subMenus[subMenu.id].map((subSubMenu: IMenu) => (
                          <li key={subSubMenu.id}>
                            <Link
                              className="dropdown-item"
                              href={subSubMenu.link}
                            >
                              {isEnglish
                                ? subSubMenu.labelEn
                                : subSubMenu.labelBn}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
