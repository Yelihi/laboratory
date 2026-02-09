"use client";

import Image from "next/image";
import styles from "./AdBadge.module.css";

export const AdBadge = () => {
  return (
    <div className={styles.container}>
      <Image
        src='/assets/icon/ad.png'
        alt='광고'
        width={12}
        height={12}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};
