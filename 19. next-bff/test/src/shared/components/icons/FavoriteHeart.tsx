"use client";

import Image from "next/image";

export interface FavoriteHeartProps {
  isSelected: boolean;
  width?: number;
  height?: number;
}

const selectedHeartIconPath = `/assert/icon/favorite-on.png`;
const unselectedHeartIconPath = `/assert/icon/favorite-off.png`;

export const FavoriteHeart = ({
  isSelected,
  width,
  height,
}: FavoriteHeartProps) => {
  return (
    <Image
      src={isSelected ? selectedHeartIconPath : unselectedHeartIconPath}
      alt='favorite-heart'
      width={width || 24}
      height={height || 24}
    />
  );
};
