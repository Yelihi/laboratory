"use client";

import styles from "./Review.module.css";
import { ItemImage } from "@/views/main/ui/components/item-image/ItemImage";
import { ItemPrice } from "@/views/main/ui/components/ItemPrice";
import { ReviewComment } from "@/views/main/ui/components/review/ReviewComment";

import type { ReviewProduct } from "@/entities/review/models/dtos";

export const Review = ({
  image,
  productName,
  artistName,
  saleRate,
  price,
  reviewInfo,
  reviewRate,
  reviewCount,
}: ReviewProduct) => {
  return (
    <div className={styles.container}>
      <div className={styles.reviewImageSection}>
        <div className={styles.imageSection}>
          <ItemImage
            url={image}
            alt={productName}
            isFavoriteAction={true}
            isPromotionBadgeVisible={false}
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.nameSection}>
            <div className={styles.artistName}>{artistName}</div>
            <h3 className={styles.productName}>{productName}</h3>
          </div>
          <ItemPrice
            salePrice={price}
            discountRate={saleRate}
            priceUnitSize={12}
            priceSize={14}
            saleRateSize={14}
          />
        </div>
      </div>
      <ReviewComment
        reviewInfo={reviewInfo}
        reviewRate={reviewRate}
        reviewCount={reviewCount}
      />
    </div>
  );
};
