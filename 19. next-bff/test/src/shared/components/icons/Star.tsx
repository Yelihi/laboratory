"use client";

import Image from "next/image";

export interface StarProps {
  width?: number;
  height?: number;
}

const starIconPath = "/assets/icon/review-star.svg";

export const Star = ({ width = 24, height = 24 }: StarProps) => {
  return <Image src={starIconPath} alt='star' width={width} height={height} />;
};
