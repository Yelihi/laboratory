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

const ReviewInfoSchema = z.object({
  text: z.string(),
  types: z.array(z.string()),
  size: z.number().positive(),
  color: z.string(),
  colorWeb: z.string(),
  bgColor: z.string().nullable(),
  bgColorWeb: z.string().nullable(),
});

const ReviewProductSchema = z.object({
  uuid: z.string().uuid(),
  image: z.string(),
  productName: z.string(),
  artistName: z.string(),
  saleRate: z.number().min(0).max(100),
  price: z.number().int().min(0),
  reviewInfo: z.array(ReviewInfoSchema),
  reviewRate: z.number().min(0).max(5),
  reviewCount: z.number().int().min(0),
});

export const ReviewsResponseDtoSchema = z.object({
  title: z.array(TitleSegmentSchema),
  products: z.array(ReviewProductSchema),
});
