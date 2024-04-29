import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="main">
        <div className="main__container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
