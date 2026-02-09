import { FeedItem } from "@/entities/feed/models/dtos";

export class FeedBehavior {
  /**
   * @description feed Data 의 실제 렌더 시 순서 조정
   * @param {FeedItem[]} feedData
   */
  public sortFeedItems = (feedData: FeedItem[]) => {
    // 회사 내 정책
  };
}
