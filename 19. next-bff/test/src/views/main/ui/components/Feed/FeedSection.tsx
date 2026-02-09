"use client";

import styles from "./FeedSection.module.css";

import type { FeedItem } from "@/entities/feed/models/dtos";

// components
import { Feed } from "./Feed";

export const FeedSection = ({ items }: { items: FeedItem[] }) => {
  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <div key={`sort-item-${index}`} className={styles.gridItem}>
            <Feed {...item} />
          </div>
        ))}
      </div>
    </section>
  );
};
