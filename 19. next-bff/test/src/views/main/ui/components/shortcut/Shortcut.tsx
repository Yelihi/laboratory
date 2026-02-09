"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./Shortcut.module.css";

import type { ShortcutProps } from "@/views/main/models/interface";

export const Shortcut = ({ id, imageUrl, label, webUrl }: ShortcutProps) => {
  return (
    <Link
      href={webUrl}
      target='_blank'
      rel='noopener noreferrer'
      className={styles.container}
    >
      <div className={styles.iconWrapper}>
        <div className={styles.shortcutCircle}>
          <Image
            src={imageUrl}
            alt={label}
            width={48}
            height={48}
            className={styles.iconImage}
          />
        </div>
      </div>
      <span className={styles.label}>{label}</span>
    </Link>
  );
};
