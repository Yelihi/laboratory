import { Metadata } from "next";

import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "아이더스 상품 목록",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={styles.layout}>
      <div className={styles.container}>{children}</div>
    </main>
  );
};

export default Layout;
