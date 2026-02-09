export interface TitleSegment {
  text: string;
  types: string[];
  size: number;
  color: string;
  colorWeb: string;
  bgColor: string | null;
  bgColorWeb: string | null;
}

export interface ReviewInfo {
  text: string;
  types: string[];
  size: number;
  color: string;
  colorWeb: string;
  bgColor: string | null;
  bgColorWeb: string | null;
}

export interface ReviewProduct {
  uuid: string;
  image: string;
  productName: string;
  artistName: string;
  saleRate: number;
  price: number;
  reviewInfo: ReviewInfo[];
  reviewRate: number;
  reviewCount: number;
}

/** response dto  */

export interface ReviewsResponseDto {
  title: TitleSegment[];
  products: ReviewProduct[];
}
