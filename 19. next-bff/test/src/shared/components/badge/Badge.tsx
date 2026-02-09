"use client";

import Image from "next/image";
import styles from "./Badge.module.css";

export interface BadgeProps {
  type: "RECTANGLE" | string;
  label: string;
  colorFont: string;
  colorBackground: string;
  image: string | null;
}

export const Badge = ({
  label,
  colorFont,
  colorBackground,
  image,
}: BadgeProps) => {
  return (
    <div
      className={styles.container}
      style={{
        color: colorFont,
        backgroundColor: colorBackground,
      }}
    >
      <span className={styles.label}>
        {image && (
          <Image
            src={image}
            alt={label}
            width={14}
            height={14}
            className={styles.image}
          />
        )}
        {label}
      </span>
    </div>
  );
};
