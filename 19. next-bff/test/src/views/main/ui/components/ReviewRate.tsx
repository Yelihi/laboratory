import styles from "@/views/main/ui/components/ReviewRate.module.css";

// shared
import { Star } from "@/shared/components/icons/Star";

// views
import type { ReviewRateSectionProps } from "@/views/main/models/interface";

export const ReviewRate = ({
  rate,
  count,
  fontSize,
  startSize,
}: ReviewRateSectionProps) => {
  return (
    <div className={styles.reviewRateSection}>
      <Star width={startSize || 14} height={startSize || 14} />
      <span
        className={styles.reviewRateLabel}
        style={{ fontSize: `${fontSize}px` }}
      >
        {rate.toFixed(1)}
      </span>
      <span
        className={styles.reviewCount}
        style={{ fontSize: `${fontSize}px` }}
      >
        ({count})
      </span>
    </div>
  );
};
