import type { FeedItem } from "@/entities/feed/models/dtos";
import { SORT_FEED_ITEM_TYPE } from "@/entities/feed/models/enums";
import type {
  SortItem,
  SortFeedItem,
  RuleContext,
  Rule,
} from "@/entities/feed/services/interface";

export class FeedService {
  private readonly ruleTable: Rule[] = [
    {
      name: "SHORTCUT_INTERVAL",
      when: (ctx: RuleContext) => ctx.itemIndex === 4 && ctx.initial,
      then: () => ({ type: SORT_FEED_ITEM_TYPE.SHORTCUT }),
    },
    {
      name: "GIFT_INTERVAL",
      when: (ctx: RuleContext) => ctx.itemIndex === 8 && ctx.initial,
      then: () => ({ type: SORT_FEED_ITEM_TYPE.GIFT }),
    },
    {
      name: "REVIEW_INTERVAL",
      when: (ctx: RuleContext) => ctx.itemIndex === 12 && ctx.initial,
      then: () => ({ type: SORT_FEED_ITEM_TYPE.REVIEW }),
    },
  ];

  /**
   * @description 정책 조건에 따라 FeedItems 내 section 조절
   * @param feedItems Feed 아이템 배열
   * @returns 정책에 따라 정렬된 SortFeedItem 배열
   */
  public createSortedItems = (
    feedItems: FeedItem[],
    initial: boolean
  ): SortItem[] => {
    const result: SortItem[] = [];
    let partialFeedItems: SortFeedItem[] = [];

    feedItems.forEach((feed, index) => {
      const ctx: RuleContext = {
        itemIndex: index,
        initial: initial,
      };

      const matchedRule = this.ruleTable.find((rule) => rule.when(ctx));

      /**
       * 정책조건에 맞다면
       * 1. 현재까지의 feedItems 를 result 에 추가
       * 2. 정책조건에 맞는 type 의 item 을 다음 순번의 result 에 추가
       * 3. partialFeedItems 를 초기화 하면 현 순번의 feed 저장
       */
      if (matchedRule) {
        result.push(...partialFeedItems);
        result.push(matchedRule.then());
        partialFeedItems = [
          {
            type: SORT_FEED_ITEM_TYPE.FEED,
            items: [feed],
          },
        ];
      } else {
        if (partialFeedItems.length === 0) {
          partialFeedItems = [
            {
              type: SORT_FEED_ITEM_TYPE.FEED,
              items: [feed],
            },
          ];
        } else {
          partialFeedItems[0].items.push(feed);
        }
      }
    });

    if (partialFeedItems.length > 0) {
      result.push(...partialFeedItems);
    }

    return result;
  };
}

export const feedService = Object.freeze(new FeedService());
