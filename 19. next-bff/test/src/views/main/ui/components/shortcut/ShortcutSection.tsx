"use client";

import styles from "./ShortcutSection.module.css";

import { Shortcut } from "@/views/main/ui/components/shortcut/Shortcut";
import type { ShortcutSectionProps } from "@/views/main/models/interface";

export const ShortcutSection = ({ title, items }: ShortcutSectionProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.shortcutsContainer}>
        {items.map((item) => {
          return <Shortcut key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};
