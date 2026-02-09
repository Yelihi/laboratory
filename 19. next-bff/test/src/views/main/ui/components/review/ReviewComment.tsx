"use client";

import styles from "@/views/main/ui/components/review/ReviewComment.module.css";
import { ReviewRate } from "@/views/main/ui/components/ReviewRate";

import type { ReviewInfo } from "@/entities/review/models/dtos";

export interface ReviewCommentProps {
  reviewInfo: ReviewInfo[];
  reviewRate: number;
  reviewCount: number;
}

export const ReviewComment = ({
  reviewInfo,
  reviewRate,
  reviewCount,
}: ReviewCommentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.comment}>
        <div className={styles.quote}>&quot;</div>
        <div className={styles.content}>
          {reviewInfo.map((info) => {
            return (
              <span
                key={info.text}
                className={styles.textSegment}
                style={{
                  fontSize: `${info.size}px`,
                  color: info.colorWeb || info.color,
                  fontWeight: info.types.includes("BOLD") ? "700" : "400",
                  backgroundColor:
                    info.bgColorWeb || info.bgColor || "transparent",
                }}
              >
                {info.text}
              </span>
            );
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <ReviewRate
          rate={reviewRate}
          count={reviewCount}
          fontSize={12}
          startSize={12}
        />
      </div>
    </div>
  );
};
