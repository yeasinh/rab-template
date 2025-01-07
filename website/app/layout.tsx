"use client";

import "./assets/css/bootstrap.min.css";
import "./assets/css/App.scss";
import "./assets/css/index.css";
import "./assets/css/common.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/globals.css";

import type { ReactNode } from "react";
import localFont from "next/font/local";
import { store, persistor } from "@lib/store";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RootState } from "@lib/root.reducer";

interface Props {
  readonly children: ReactNode;
}

const myFont = localFont({ src: "./assets/fonts/Kalpurush.woff" });

// export const metadata: Metadata = {
//   title: 'Rapid Action Battalion',
//   description: 'The official for Rapid Action Battalion.',
// };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap CSS CDN */}
        <title>Rapid Action Battalion</title>
        <meta name="robots" content="all" />
        <meta
          property="og:title"
          content="Rapid Action Battalion"
          key="title"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </head>
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BodyWithLanguageClass>{children}</BodyWithLanguageClass>
          </PersistGate>
        </Provider>
        {/* Bootstrap JS CDN */}
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
          integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
          integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}

function BodyWithLanguageClass({ children }: { children: React.ReactNode }) {
  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);

  return (
    <div className={`${myFont.className} ${isEnglish ? "lang-en" : "lang-bn"}`}>
      {children}
    </div>
  );
}
