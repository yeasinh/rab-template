"use client";

import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { ReactNode } from "react";
import SideBar from "../components/sidebar/SideBar";

import { ApolloProvider } from "@apollo/client";
//import { StoreProvider } from "../../StoreProvider";

interface Props {
  readonly children: ReactNode;
}
export default function DashboardLayout({ children }: Props) {
  return (
    // <StoreProvider>
    <div className="wrapper">
      <SideBar />
      <div className="page-wrapper">
        <Navbar />
        <div className="page-content">{children}</div> <Footer />
      </div>
    </div>
    // </StoreProvider>
  );
}
