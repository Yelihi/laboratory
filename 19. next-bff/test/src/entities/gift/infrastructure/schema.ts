import { z } from "zod";

const TitleSegmentSchema = z.object({
  text: z.string(),
  types: z.array(z.string()),
  size: z.number().positive(),
  color: z.string(),
  colorWeb: z.string(),
  bgColor: z.string().nullable(),
  bgColorWeb: z.string().nullable(),
});

const GiftItemDtoSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  artistId: z.number().int(),
  artistUuid: z.string().uuid(),
  saleRate: z.number().min(0).max(100),
  priceSale: z.number().int().min(0),
  thumbImageUrl: z.string(),
});

export const GiftsResponseDtoSchema = z.object({
  id: z.string(),
  icon: z.string(),
  targetId: z.string(),
  title: z.array(TitleSegmentSchema),
  themeTitle: z.string(),
  items: z.array(GiftItemDtoSchema),
});
