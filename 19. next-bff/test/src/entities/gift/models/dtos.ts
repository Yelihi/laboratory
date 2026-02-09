export interface TitleSegment {
  text: string;
  types: string[];
  size: number;
  color: string;
  colorWeb: string;
  bgColor: string | null;
  bgColorWeb: string | null;
}

export interface GiftItemDto {
  uuid: string;
  name: string;
  artistId: number;
  artistUuid: string;
  saleRate: number;
  priceSale: number;
  thumbImageUrl: string;
}

/** response dto */

export interface GiftsResponseDto {
  id: string;
  icon: string;
  targetId: string;
  title: TitleSegment[];
  themeTitle: string;
  items: GiftItemDto[];
}
