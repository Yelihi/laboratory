"use client";

import styles from "./ItemPrice.module.css";

// shared
import { formatPrice } from "@/shared/utils/formatPrice";

export interface ItemPriceProps {
  salePrice: number;
  discountRate: number;
  priceUnitSize: number;
  priceSize: number;
  saleRateSize: number;
}

export const ItemPrice = ({
  salePrice,
  discountRate,
  priceUnitSize,
  priceSize,
  saleRateSize,
}: ItemPriceProps) => {
  return (
    <div className={styles.container}>
      <span
        className={styles.saleRate}
        style={{ fontSize: `${saleRateSize}px` }}
      >
        {discountRate}%
      </span>
      <span className={styles.price} style={{ fontSize: `${priceSize}px` }}>
        {formatPrice(salePrice)}
      </span>
      <span
        className={styles.priceUnit}
        style={{ fontSize: `${priceUnitSize}px` }}
      >
        원
      </span>
    </div>
  );
};
