export interface Review {
  count: number;
  rate: number;
  rateLabel: string;
  contents: string;
  starFull: boolean;
}

export interface Badge {
  displayType: "RECTANGLE" | string;
  label: string;
  colorFont: string;
  colorBackground: string;
  image: string | null;
}

export interface PromotionLabel {
  types: string[];
  text: string;
  colorFont: string;
  size: number;
}

export interface Promotion {
  colorBackground: string;
  labels: PromotionLabel[];
}

export interface FeedItem {
  uuid: string;
  name: string;
  image: string;
  artistUuid: string;
  artistName: string;
  salePrice: number;
  discountRate: number;
  review: Review;
  badges: Badge[];
  promotion: Promotion;
  isAdBadgeVisible: boolean;
  artistId: number;
}

export interface Pagination {
  total: number;
  current: number;
  pageSize: number;
  itemSize: number;
}

/** response dto */

export interface MainFeedResponseDto {
  items: FeedItem[];
  pagination: Pagination;
}
