// entities
import type { GiftItemDto } from "@/entities/gift/models/dtos";
import type { ReviewProduct, ReviewInfo } from "@/entities/review/models/dtos";

/** feed  */

export interface ReviewProps {
  count: number;
  rate: number;
}

/** review section */
export interface ReviewSectionProps {
  titles: UnitSectionTitleProps[];
  items: ReviewProduct[];
}

/** review */
export interface ReviewCommentProps {
  id: string;
  image: string;
  productName: string;
  artistName: string;
  saleRate: number;
  price: number;
  reviewInfo: ReviewInfo[];
  reviewRate: number;
  reviewCount: number;
}

/** review rate section */
export interface ReviewRateSectionProps {
  rate: number;
  count: number;
  fontSize: number;
  startSize: number;
}

/** gift section */
export interface UnitSectionTitleProps {
  text: string;
  fontSize: number;
  fontColor: string | null;
  backgroundColor: string | null;
  type: "BOLD" | "REGULAR";
}

export interface GiftSectionProps {
  id: number;
  icon: string;
  titles: UnitSectionTitleProps[];
  themeTitle: string;
  items: GiftItemDto[];
}

/** shortcut */
export interface ShortcutProps {
  id: number;
  imageUrl: string;
  label: string;
  webUrl: string;
}

export interface ShortcutSectionProps {
  title: string;
  items: ShortcutProps[];
}
