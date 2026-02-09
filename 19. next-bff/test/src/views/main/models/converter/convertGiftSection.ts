import type { GiftsResponseDto } from "@/entities/gift/models/dtos";

import type { GiftSectionProps } from "@/views/main/models/interface";

export const convertGiftSection = (
  gifts: GiftsResponseDto
): GiftSectionProps => {
  return {
    id: Number(gifts.id),
    icon: gifts.icon,
    titles: gifts.title.map((title) => ({
      text: title.text,
      fontSize: title.size,
      fontColor: title.color,
      backgroundColor: title.bgColor,
      type: title.types[0] as "BOLD" | "REGULAR",
    })),
    themeTitle: gifts.themeTitle,
    items: gifts.items.map((item) => ({
      uuid: item.uuid,
      artistId: item.artistId,
      thumbImageUrl: item.thumbImageUrl,
      name: item.name,
      artistUuid: item.artistUuid,
      saleRate: item.saleRate,
      priceSale: item.priceSale,
    })),
  };
};
