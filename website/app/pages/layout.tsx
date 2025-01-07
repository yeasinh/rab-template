import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

interface Props {
  readonly children: ReactNode;
}
export default function MainLayout({ children }: Props) {
  return (
    <>
      <div className="backToTop-wrapper">
        <a href="#">
          <Icon icon="flowbite:angle-top-solid" width="24px" height="24px" />
        </a>
      </div>
      <Header />
      {children}
      <Footer />
    </>
  );
}
