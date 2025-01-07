"use client";

import "./Footer.scss";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import RABLogo from "../../assets/images/RAB-Logo.png";
import React, { useEffect } from "react";
import { useAppDispatch } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { contactActions } from "@lib/slices/contact/contact.slice";
import { useSelector } from "react-redux";
import { logoAndTitleActions } from "@lib/slices/logoAndTitle/logoAndTitle.slice";
import QuickContact from "../QuickContact/QuickContact";

const Footer = () => {
  const dispatch = useAppDispatch();

  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);

  const contacts = useSelector(
    (state: RootState) => state.contact.getContactResponse?.findAllConatctInfo
  );

  const logoAndTitles = useSelector(
    (state: RootState) =>
      state.logoAndTitle.getLogoAndTitleResponse?.findAllLogoAndTitle
  );

  useEffect(() => {
    dispatch(
      contactActions.getContactFetch({
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

  const contact = contacts && contacts[contacts?.length - 1];

  const logoAndTitle =
    logoAndTitles && logoAndTitles[logoAndTitles?.length - 1];

  return (
    <>
      <section className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 d-flex align-items-center">
              <div className="footer-info">
                <div className="footer-social-card">
                  <div className="footer-social-icon">
                    <Image
                      src={contact?.addressIconPath}
                      alt="AddressIcon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="footer-social-text">
                    <p>
                      {isEnglish ? "Office" : "দপ্তর"}:{" "}
                      {isEnglish ? contact?.addressEn : contact?.addressBn}
                    </p>
                  </div>
                </div>
                <div className="footer-social-card">
                  <div className="footer-social-icon">
                    <Image
                      src={contact?.phoneIconPath}
                      alt="PhoneIcon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="footer-social-text">
                    <p>
                      {isEnglish ? "Phone" : "ফোন"}:{" "}
                      {isEnglish ? contact?.phoneEn : contact?.phoneBn}
                    </p>
                  </div>
                </div>
                <div className="footer-social-card">
                  <div className="footer-social-icon">
                    <Image
                      src={contact?.mobileIconPath}
                      alt="MobileIcon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="footer-social-text">
                    <p>
                      {isEnglish ? "Mobile" : "মোবাইল"}:{" "}
                      {isEnglish ? contact?.mobileEn : contact?.mobileBn}
                    </p>
                  </div>
                </div>
                <div className="footer-social-card">
                  <div className="footer-social-icon">
                    <Image
                      src={contact?.faxIconPath}
                      alt="FaxIcon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="footer-social-text">
                    <p>
                      {isEnglish ? "Fax" : "ফ্যাক্স"}:{" "}
                      {isEnglish ? contact?.faxEn : contact?.faxBn}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 mt-lg-0 mt-md-0">
              <div className="footer-logo">
                <Image
                  src={logoAndTitle?.headerLogoPath}
                  alt="RABLogo"
                  height={100}
                  width={100}
                />
              </div>
            </div>
            <QuickContact />
          </div>
        </div>
      </section>
      <section className="footer-bottom-area">
        <div className="container">
          <p>
            © 2024 RAB HQ All Rights Reserved | Design & Development by :{" "}
            <Link target="_blank" href="https://www.intellier.com/">
              Intellier Limited
            </Link>{" "}
            | Supported by :{" "}
            <Link href="/pages/wings/6">Communication & MIS Wing</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
