"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar1 from "../../assets/images/avatars/avatar-1.png";
import logo from "../../assets/images/rab-logo.png";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { RootState } from "@lib/root.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "@lib/hooks";
import { loginActions } from "@lib/slices/auth/login/login.slice";
import { redirect } from "next/navigation";
import { removeToken } from "@lib/utils/action";
import { sidebarActions } from "@lib/slices/sidebar/sidebar.slice";

export default function Navbar() {
  const dispatch = useDispatch();
  const [isToggled, setIsToggled ]= useState(false);

  const userName = useSelector(
    (state: RootState) => state.login?.user?.login?.name
  );

  const userType = useSelector(
    (state: RootState) => state.login?.user?.login?.userType
  );

  const isLogin = useSelector((state: RootState) => state.login?.isLogin);

  const handleLogout = () => {
    removeToken();
    dispatch(loginActions.resetLogin());
    //dispatch(loginActions.resetLogin());
    //return redirect('/login');
  };

  useEffect(() => {
    return () => {
      //dispatch(loginActions.resetLogin());
      if (!isLogin) redirect("/login");
    };
  });
 const headerMenu=()=>{
  setIsToggled(!isToggled)
  }

  return (
    <div className="main-navbar-wrapper">
      <nav className="navbar navbar-expand-md">
        <div className="container-fluid">
          <div className="navbar-brand d-contents d-sm-none">
            <button
              style={{
                background: "transparent",
                border: "1px solid #666",
                borderRadius: "5px",
              }}
              onClick={() => dispatch(sidebarActions.toggleSidebar())}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <Image src={logo} alt="rab logo" width={12} height={12} />
            <span className="logo_name">Rapid Action Battalion</span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            onClick={headerMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isToggled ? 'show': ''}`} id="navbarSupportedContent">
            {/* <div className="sidebar-togglar d-none d-sm-block">
              <Link href="#">
                <i className="fa-solid fa-bars"></i>
              </Link>
            </div> */}
            <form className="d-flex me-auto d-none d-sm-flex" role="search">
              {/* <i className="fa-solid fa-magnifying-glass"></i>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Here"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
            </form>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link go-live"
                  title="Go Website"
                  aria-current="page"
                  href="/pages/dashboard"
                >
                  <i className="fa-solid fa-up-right-from-square"></i>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link language-link"
                  title="Language"
                  aria-current="page"
                  href="#"
                >
                  <i className="fa-solid fa-language me-2"></i> বাংলা
                </Link>
              </li> */}
              <li
                className="nav-item dropdown"
                style={{ width: "min-content" }}
              >
                <Dropdown>
                  <Dropdown.Toggle
                    variant="basic"
                    id="dropdown-basic"
                    className="nav-link"
                  >
                    <Image
                      src={avatar1}
                      alt="rab logo"
                      width={120}
                      height={120}
                    />
                    <div className="username-wrapper">
                      <p>{userName}</p>
                      <small>{userType}</small>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* <Dropdown.Item href="#/action-1">My Profile</Dropdown.Item> */}
                    {/* <Dropdown.Item>Setting</Dropdown.Item> */}
                    <Dropdown.Item onClick={handleLogout}>
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
