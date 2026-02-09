"use client";

import { useState } from "react";

import Image from "next/image";
import styles from "./ItemImage.module.css";

import { FavoriteHeart } from "@/shared/components/icons/FavoriteHeart";

interface ItemImageProps {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  isFavoriteAction: boolean;
  isPromotionBadgeVisible: boolean;
  children?: React.ReactNode;
}

export const ItemImage = ({
  url,
  alt,
  width,
  height,
  isFavoriteAction,
  isPromotionBadgeVisible,
  children,
}: ItemImageProps) => {
  const [isSelectedHeart, setIsSelectedHeart] = useState(false);

  const handleClickFavorite = () => {
    setIsSelectedHeart((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <Image
        src={url}
        alt={alt}
        fill={!width || !height}
        width={width}
        height={height}
        className={styles.image}
        sizes='(max-width: 768px) 20vw, (max-width: 1200px) 30vw, 20vw'
      />
      {isFavoriteAction && (
        <button
          className={styles.favoriteButton}
          aria-label='즐겨찾기'
          onClick={handleClickFavorite}
        >
          <FavoriteHeart isSelected={isSelectedHeart} />
        </button>
      )}
      {isPromotionBadgeVisible && (
        <div className={styles.promotionLabel}>{children}</div>
      )}
    </div>
  );
};
