"use client";

import "./Header.scss";
import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import { Dropdown } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import RABLogo from "../../assets/images/RAB-Logo.png";
import Menu from "../Menu/Menu";
import { useAppDispatch } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { useSelector } from "react-redux";
import LanguageToggleButton from "../Language/LanguageToggleButton";
import MobileMenu from "../Menu/MobileMenu";
import SuggestionModal from "../Suggestion/Suggestion";
import { searchActions } from "@lib/slices/search/search.slice";
import { Chip } from "@mui/material";
import GlobalSearch from "../UI/GlobalSearch/GlobalSearch";
import { transform } from "next/dist/build/swc";
import { emergencyContactActions } from "@lib/slices/emergencyContact/emergencyContact.slice";
import { logoAndTitleActions } from "@lib/slices/logoAndTitle/logoAndTitle.slice";
import { searchBarActions } from "@lib/slices/searchBar/searchBar.slice";
import { linkTitleActions } from "@lib/slices/link/linkTitle.slice";
import { linkItemActions } from "@lib/slices/link/linkItem.slice";
import { WebsiteOrSocialMedia } from "@lib/services/link/link.service.type";
import { Publish } from "@lib/services/emergencyContact/emergencyContact.service.type";

const Header = () => {
  const dispatch = useAppDispatch();
  const elementRef = useRef(null);

  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);

  const searchOverviewResults = useSelector(
    (state: RootState) => state.search.searchOverviewResponse?.serchOverView
  );

  const searchOverviewPath = useSelector(
    (state: RootState) => state.search.searchOverviewResponse?.path
  );

  const emergencyContacts = useSelector(
    (state: RootState) =>
      state.emergencyContact.getEmergencyContactResponse
        ?.findAllEmergencyConatct
  );

  const logoAndTitles = useSelector(
    (state: RootState) =>
      state.logoAndTitle.getLogoAndTitleResponse?.findAllLogoAndTitle
  );

  const searchBars = useSelector(
    (state: RootState) =>
      state.searchBar.getSearchBarResponse?.findAllSearchBarInfo
  );

  const [show, setShow] = useState(false);
  const [isSuggestionPopupVisible, setSuggestionPopupVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const showSuggestionPopup = () => {
    setSuggestionPopupVisible(true);
  };

  const closeSuggestionPopup = () => {
    setSuggestionPopupVisible(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("Search term: ", searchTerm);
    try {
      dispatch(
        searchActions.searchFetch({
          request: {
            searchText: searchTerm,
          },
        })
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSearch = () => {
    console.log("Searching for: ", searchTerm);
    try {
      dispatch(
        searchActions.searchFetch({
          request: {
            searchText: searchTerm,
          },
        })
      );
    } catch (error) {
      console.log("Error: ", error);
    }
    console.log("Search result: ", searchOverviewResults);
  };

  useEffect(() => {
    dispatch(
      emergencyContactActions.getEmergencyContactFetch({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      logoAndTitleActions.getLogoAndTitleFetch({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      searchBarActions.getSearchBarFetch({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  const emergencyContact =
    emergencyContacts &&
    emergencyContacts.find((ec) => ec.isPublished === Publish.YES);

  const logoAndTitle =
    logoAndTitles && logoAndTitles.find((ec) => ec.isPublished === Publish.YES);

  const searchBar = searchBars && searchBars[searchBars?.length - 1];

  const linkTitles = useSelector(
    (state: RootState) =>
      state.linkTitle.getLinkTitleResponse?.findAllQuickLinkInfo
  );

  const linkItems = useSelector(
    (state: RootState) => state.linkItem.getLinkItemResponse?.findAllQuickLink
  );

  useEffect(() => {
    dispatch(
      linkTitleActions.getLinkTitleFetch({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      linkItemActions.getLinkItemFetch({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  const webTitle = linkTitles?.filter(
    (item) => item?.isWebsite === WebsiteOrSocialMedia.WEBSITE
  )[linkTitles?.length];

  const socialTitle = linkTitles?.filter(
    (item) => item?.isWebsite === WebsiteOrSocialMedia.SOCIALMEDIA
  )[linkTitles?.length];

  const webItems = linkItems?.filter(
    (item) => item?.isWebsite === WebsiteOrSocialMedia.WEBSITE
  );

  const socialItems = linkItems?.filter(
    (item) => item?.isWebsite === WebsiteOrSocialMedia.SOCIALMEDIA
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        elementRef.current?.classList.add("hide-wrapper");
      } else if (currentScrollY < lastScrollY) {
        elementRef.current?.classList.remove("hide-wrapper");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="header-menu-fixed">
        <section className="header-contact" ref={elementRef}>
          <div className="container">
            <div className="d-flex justify-content-lg-end align-items-center">
              <div className="header-contact-area">
                <p>
                  {isEnglish
                    ? emergencyContact?.titleEn
                    : emergencyContact?.titleBn}
                </p>
                <div className="contact-area">
                  <Icon icon="ic:baseline-phone" width="16px" height="16px" />
                  <Link href="#">
                    {isEnglish
                      ? emergencyContact?.phoneNumberEn
                      : emergencyContact?.phoneNumberBn}
                  </Link>
                </div>
                <div className="contact-area">
                  <Icon icon="fluent:phone-24-regular" height="16px" />
                  <Link href="#">
                    {isEnglish
                      ? emergencyContact?.mobileNumberEn
                      : emergencyContact?.mobileNumberBn}
                  </Link>
                </div>
                <div className="contact-area lang-wrapper">
                  <LanguageToggleButton />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="logo-area">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mobile-menu-btn">
                <button
                  className="menu-toggle"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasWithBothOptions"
                  aria-controls="offcanvasWithBothOptions"
                >
                  <Icon icon="mdi:menu" width="36px" height="36px" />
                </button>

                <div
                  className="offcanvas offcanvas-start"
                  data-bs-scroll="true"
                  id="offcanvasWithBothOptions"
                  aria-labelledby="offcanvasWithBothOptionsLabel"
                >
                  <div className="offcanvas-header d-flex justify-content-between">
                    <h5
                      className="offcanvas-title"
                      id="offcanvasWithBothOptionsLabel"
                    >
                      {isEnglish ? "Menu" : "মেনু"}
                    </h5>
                    <button
                      type="button"
                      className="mobile-btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      <Icon icon="iconoir:cancel" width="30px" height="30px" />
                    </button>
                  </div>
                  <MobileMenu />
                </div>
              </div>

              <div className="header-logo">
                <Link href="/pages/home">
                  <Image
                    src={logoAndTitle?.headerLogoPath}
                    alt="RABLogo"
                    width={100}
                    height={100}
                  />
                  <span className="logo-name">
                    {isEnglish ? logoAndTitle?.titleEn : logoAndTitle?.titleBn}
                  </span>
                </Link>
              </div>
              <GlobalSearch />
            </div>
          </div>
        </section>
        <Menu></Menu>
      </div>
      <div className="quick-link-wrapper">
        <div className="toggle-wrapper">
          <Link href="#" onClick={() => setShow(!show)}>
            <Icon
              className={`animation ${show ? "" : "rotation"}`}
              icon="fa:angle-double-right"
              width="30px"
              height="30px"
            />
          </Link>
        </div>
        <div
          className={`${
            show ? "link-items-wrapper" : "link-items-wrapper-none"
          }`}
        >
          <div className="important-links">
            <div className="btn-group dropstart">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <Icon
                    icon="material-symbols:frame-reload"
                    width="29px"
                    height="29px"
                  />
                  <p>{isEnglish ? "Links" : "লিঙ্ক"}</p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {webItems?.map((webItem) => (
                    <li key={webItem?.id}>
                      <Link
                        className="dropdown-item"
                        href={`${webItem?.url}`}
                        target="_blank"
                      >
                        <span className="social-icon">
                          <Image
                            src={webItem?.iconPath?.toString()}
                            alt="LinkIcon"
                            width={20}
                            height={20}
                          />
                        </span>
                        <span>
                          {isEnglish ? webItem?.nameEn : webItem?.nameBn}
                        </span>
                      </Link>
                    </li>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="social-link">
            <div className="btn-group dropstart">
              <Dropdown>
                <Dropdown.Toggle variant="success">
                  <Icon icon="ion:share-social" width="26px" height="26px" />
                  <p>{isEnglish ? "Socials" : "সামাজিক"}</p>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {socialItems?.map((socialItem) => (
                    <li key={socialItem?.id}>
                      <Link
                        className="dropdown-item"
                        href={`${socialItem.url}`}
                        target="_blank"
                      >
                        <span className="social-icon">
                          <Image
                            src={socialItem?.iconPath?.toString()}
                            alt="LinkIcon"
                            width={20}
                            height={20}
                          />
                        </span>
                        <span>
                          {isEnglish ? socialItem.nameEn : socialItem.nameBn}
                        </span>
                      </Link>
                    </li>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="suggestion mt-3">
            <div className="btn-group dropstart">
              <div className="suggestion-context" onClick={showSuggestionPopup}>
                <Icon icon="iconoir:suggestion" width="26px" height="26px" />
                <p>{isEnglish ? "Suggestion" : "মতামত"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSuggestionPopupVisible && (
        <SuggestionModal closeSuggestionPopup={closeSuggestionPopup} />
      )}
    </>
  );
};

export default Header;
