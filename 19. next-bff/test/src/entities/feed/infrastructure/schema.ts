import { z } from "zod";
import { SORT_FEED_ITEM_TYPE } from "@/entities/feed/models/enums";

const ReviewSchema = z.object({
  count: z.number().int().min(0),
  rate: z.number().min(0).max(5),
  rateLabel: z.string(),
  contents: z.string(),
  starFull: z.boolean(),
});

const BadgeSchema = z.object({
  displayType: z.string(),
  label: z.string(),
  colorFont: z.string(),
  colorBackground: z.string(),
  image: z.string().nullable(),
});

const PromotionLabelSchema = z.object({
  types: z.array(z.string()),
  text: z.string(),
  colorFont: z.string(),
  size: z.number().positive(),
});

const PromotionSchema = z.object({
  colorBackground: z.string(),
  labels: z.array(PromotionLabelSchema),
});

const FeedItemSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  image: z.string(),
  artistUuid: z.string().uuid(),
  artistName: z.string(),
  salePrice: z.number().int().min(0),
  discountRate: z.number().min(0).max(100),
  review: ReviewSchema,
  badges: z.array(BadgeSchema),
  promotion: PromotionSchema,
  isAdBadgeVisible: z.boolean(),
  artistId: z.number().int(),
});

const PaginationSchema = z.object({
  total: z.number().int().min(0),
  current: z.number().int().min(1),
  pageSize: z.number().int().positive(),
  itemSize: z.number().int().min(0),
});

// SortItem 스키마들
const SortFeedItemSchema = z.object({
  type: z.literal(SORT_FEED_ITEM_TYPE.FEED),
  items: z.array(FeedItemSchema),
});

const SortReviewItemSchema = z.object({
  type: z.literal(SORT_FEED_ITEM_TYPE.REVIEW),
});

const SortShortcutItemSchema = z.object({
  type: z.literal(SORT_FEED_ITEM_TYPE.SHORTCUT),
});

const SortGiftItemSchema = z.object({
  type: z.literal(SORT_FEED_ITEM_TYPE.GIFT),
});

const SortItemSchema = z.discriminatedUnion("type", [
  SortFeedItemSchema,
  SortReviewItemSchema,
  SortShortcutItemSchema,
  SortGiftItemSchema,
]);

export const MainFeedResponseDtoSchema = z.object({
  items: z.array(FeedItemSchema),
  pagination: PaginationSchema,
});

export const SortedFeedItemResponseDtoSchema = z.object({
  items: z.array(SortItemSchema),
  pagination: PaginationSchema,
});
