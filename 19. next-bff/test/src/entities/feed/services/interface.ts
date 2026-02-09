import { SORT_FEED_ITEM_TYPE } from "@/entities/feed/models/enums";
import type { FeedItem, Pagination } from "@/entities/feed/models/dtos";

export interface SortFeedItem {
  type: SORT_FEED_ITEM_TYPE.FEED;
  items: FeedItem[];
}

export interface SortReviewItem {
  type: SORT_FEED_ITEM_TYPE.REVIEW;
  // TODO: 필요하다면 속성 추가
}

export interface SortShortcutItem {
  type: SORT_FEED_ITEM_TYPE.SHORTCUT;
}

export interface SortGiftItem {
  type: SORT_FEED_ITEM_TYPE.GIFT;
}

export type SortItem =
  | SortFeedItem
  | SortReviewItem
  | SortShortcutItem
  | SortGiftItem;

export interface RuleContext {
  itemIndex: number;
  initial: boolean;
  // 필요하다면 추가;
}

export interface Rule {
  name: string;
  when: (ctx: RuleContext) => boolean;
  then: () => SortItem;
}

export interface SortedFeedItemResponseDto {
  items: SortItem[];
  pagination: Pagination;
}
