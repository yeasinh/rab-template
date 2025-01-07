"use client";

import "./Menu.scss";

import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch } from "@lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { menuActions } from "@lib/slices/menu/menu.slice";
import { IMenu } from "@lib/services/menu/menu.service.type";

const Menu = () => {
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

  Object.keys(subMenus).forEach((key) => {
    if (subMenus[key]) {
      subMenus[key]?.sort((a, b) => a.sort - b.sort);
    }
  });

  return (
    <>
      <section className="navbar-area">
        <Navbar expand="lg">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {sortedMainMenus.map((menu: IMenu) => (
                  <div
                    key={menu.id}
                    className={`${
                      subMenus[menu.id]
                        ? "dropdown onhover-dropdown-custom"
                        : ""
                    }`}
                  >
                    <Link
                      href={menu.link}
                      className={`${
                        subMenus[menu.id]
                          ? "nav-link dropdown-btn-custom"
                          : "nav-link"
                      }`}
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
                    {subMenus[menu.id] && (
                      <ul
                        className="dropdown-menu dropdown-menu-custom"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {subMenus[menu.id].map((subMenu: IMenu) => (
                          <li key={subMenu?.id}>
                            <div
                              className={`${
                                subMenus[subMenu?.id]
                                  ? "btn-group dropend dropdown-submenu-custom"
                                  : ""
                              }`}
                            >
                              <Link
                                className={`${
                                  subMenus[subMenu?.id]
                                    ? "dropdown-item dropdown-submenu-btn"
                                    : "dropdown-item"
                                }`}
                                href={subMenu?.link}
                              >
                                {isEnglish
                                  ? subMenu?.labelEn
                                  : subMenu?.labelBn}
                                {subMenus[subMenu?.id] && (
                                  <Icon
                                    icon="iconamoon:arrow-right-2-duotone"
                                    width="18px"
                                    height="18px"
                                  />
                                )}
                              </Link>
                              {subMenus[subMenu?.id] && (
                                <ul className="dropdown-menu onhover-submenu-custom">
                                  {subMenus[subMenu.id]?.map(
                                    (subSubMenu: IMenu) => (
                                      <li key={subSubMenu?.id}>
                                        <Link
                                          className="dropdown-item"
                                          href={subSubMenu?.link}
                                        >
                                          {isEnglish
                                            ? subSubMenu?.labelEn
                                            : subSubMenu?.labelBn}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </section>
    </>
  );
};

export default Menu;
