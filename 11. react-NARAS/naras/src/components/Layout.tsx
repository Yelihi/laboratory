import React from "react";
import style from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header className={style.header}>
        <div>🌍 NARAS</div>
      </header>
      <main className={style.main}>{children}</main>
    </div>
  );
};

export default Layout;
