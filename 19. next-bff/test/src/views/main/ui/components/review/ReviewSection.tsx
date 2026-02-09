"use client";

import styles from "./ReviewSection.module.css";
import { UnitSectionTitle } from "@/views/main/ui/components/UnitSectionTitle";
import { Review } from "@/views/main/ui/components/review/Review";

import type { ReviewSectionProps } from "@/views/main/models/interface";

export const ReviewSection = ({ titles, items }: ReviewSectionProps) => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          {titles.map((title) => {
            return <UnitSectionTitle key={title.text} {...title} />;
          })}
        </div>
      </header>
      <div className={styles.reviewsSlider}>
        {items.map((item) => {
          return <Review key={item.uuid} {...item} />;
        })}
      </div>
    </section>
  );
};
