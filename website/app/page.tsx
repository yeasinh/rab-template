import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/ImportBootstrap/ImportBsJS"
import "./assets/css/App.scss";
import "./assets/css/index.css";
import "./assets/css/common.scss";

import type { Metadata } from "next";
import { redirect } from "next/navigation";

export default function IndexPage() {
  return redirect("/pages/home");
}

export const metadata: Metadata = {
  title: 'Rapid Action Battalion',
  description: 'The official site for Rapid Action Battalion.',
  icons:{
    icon: 'icon.ico'
  }
};

