import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  const moveToHome = useCallback(() => {
    navigate("/");
  }, []);
  return (
    <div>
      <header className={style.header}>
        <div onClick={moveToHome}>🌍 NARAS</div>
      </header>
      <main className={style.main}>{children}</main>
    </div>
  );
};

export default Layout;
