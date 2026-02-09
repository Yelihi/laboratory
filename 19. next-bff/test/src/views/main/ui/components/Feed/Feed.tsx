"use client";

import styles from "./Feed.module.css";

// entities
import type { FeedItem } from "@/entities/feed/models/dtos";

// components
import { Badge } from "@/shared/components/badge/Badge";
import { Star } from "@/shared/components/icons/Star";
import { ItemImage } from "@/views/main/ui/components/item-image/ItemImage";
import { AdBadge } from "@/views/main/ui/components/item-image/AdBadge";
import { PromotionLabel } from "@/views/main/ui/components/item-image/PromotionLabel";

const formatPrice = (price: number): string => {
  return price.toLocaleString("ko-KR");
};

export const BadgeSection = ({ badges }: { badges: FeedItem["badges"] }) => {
  return (
    <div className={styles.badgeSection}>
      {badges.map((badge, index) => (
        <Badge
          key={index}
          type={badge.displayType}
          label={badge.label}
          colorFont={badge.colorFont}
          colorBackground={badge.colorBackground}
          image={badge.image}
        />
      ))}
    </div>
  );
};

export const ReviewSection = ({ review }: { review: FeedItem["review"] }) => {
  return (
    <div className={styles.reviewSection}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewRating}>
          <Star width={14} height={14} />
          <span className={styles.reviewRateLabel}>{review.rateLabel}</span>
          <span className={styles.reviewCount}>
            ({review.count.toLocaleString("ko-KR")})
          </span>
        </div>
        <span className={styles.reviewTag}>후기</span>
      </div>
      {review.contents && (
        <p className={styles.reviewContents}>{review.contents}</p>
      )}
    </div>
  );
};

export const Feed = ({
  name,
  image,
  artistName,
  salePrice,
  discountRate,
  review,
  badges,
  promotion,
  isAdBadgeVisible,
}: FeedItem) => {
  return (
    <div className={styles.container}>
      <ItemImage
        url={image}
        alt={name}
        isFavoriteAction={true}
        isPromotionBadgeVisible={promotion.labels.length > 0}
      >
        {promotion.labels.length > 0 &&
          promotion.labels.map((label, index) => (
            <PromotionLabel
              key={index}
              colorBackground={promotion.colorBackground}
              type={label.types[0] as "BOLD"}
              text={label.text}
              colorFont={label.colorFont}
              size={label.size}
            />
          ))}
      </ItemImage>

      <div className={styles.titleSection}>
        <div
          className={styles.artistSection}
          style={{
            justifyContent: isAdBadgeVisible ? "space-between" : "start",
          }}
        >
          <span className={styles.artistName}>{artistName}</span>
          {isAdBadgeVisible && <AdBadge />}
        </div>
        <span className={styles.title}>{name}</span>
      </div>

      <div className={styles.priceSection}>
        {discountRate > 0 && (
          <span className={styles.discountRate}>{discountRate}%</span>
        )}
        <span className={styles.price}>{formatPrice(salePrice)}</span>
        <span className={styles.priceUnit}>원</span>
      </div>

      {badges.length > 0 && <BadgeSection badges={badges} />}

      <ReviewSection review={review} />
    </div>
  );
};
