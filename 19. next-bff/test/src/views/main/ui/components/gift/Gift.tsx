"use client";
import styles from "./Gift.module.css";

import { ItemPrice } from "@/views/main/ui/components/ItemPrice";
import { ItemImage } from "@/views/main/ui/components/item-image/ItemImage";

export interface GiftProps {
  id: string;
  artistId: string;
  thumbImageUrl: string;
  title: string;
  discountRate: number;
  salePrice: number;
}

export const Gift = ({
  id,
  artistId,
  thumbImageUrl,
  title,
  discountRate,
  salePrice,
}: GiftProps) => {
  return (
    <div className={styles.item}>
      <ItemImage
        url={thumbImageUrl}
        alt={title}
        isFavoriteAction={true}
        isPromotionBadgeVisible={false}
      />
      <span className={styles.itemName} style={{ fontSize: "13px" }}>
        {title}
      </span>
      <ItemPrice
        salePrice={salePrice}
        discountRate={discountRate}
        priceUnitSize={9}
        priceSize={11}
        saleRateSize={11}
      />
    </div>
  );
};
