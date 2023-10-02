import { ReactElement, ReactNode } from "react";
import { Navigation, Provider } from "@components/commons";
import "@styles/global.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts",
};

const RootLayout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">
          <Navigation/>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
