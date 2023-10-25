"use client"

import { ReactElement, ReactNode } from "react";
import { Navigation, Provider } from "@components/commons";
import "@styles/global.css";

const RootLayout = ({ children }: { children: ReactNode }): ReactElement => {

  return (
    <html lang="en">
      <head>
        <title>Promptopia</title>
        <meta name="description" content="Discover and Share AI Prompts"/>
      </head>
      <body>
        <Provider>
          <>
            <div className="main">
              <div className="gradient"></div>
            </div>
            <main className="app">
              <Navigation />
              {children}
            </main>
          </>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
