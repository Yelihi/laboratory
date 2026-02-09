import type { SortedFeedItemResponseDto } from "@/entities/feed/services/interface";
import { feedRepository } from "@/entities/feed/infrastructure/repositoryImpl";
import { feedService } from "@/entities/feed/services/FeedService";

/**
 * @description 호출은 크게 2군데서 발생
 * 1. Feed, Gift 등 전달받는 sortedFeedData 를 전파하는 곳 (서버 사이드)
 * 2. FeedSection 내부 observe 된 순간 호출 (클라이언트 사이드)
 * @param {number} page
 * @returns {Promise<SortedFeedItemResponseDto>}
 */
export const queryFeedList = async (page: number, initial: boolean) => {
  try {
    // 클라이언트 사이드: API Route 호출
    if (typeof window !== "undefined") {
      const sortedFeedDatasResponse = await fetch(
        `/api/feed?page=${page}&initial=${initial}`
      );

      if (!sortedFeedDatasResponse.ok) {
        throw new Error(
          `Failed to fetch feed data: ${sortedFeedDatasResponse.statusText}`
        );
      }

      const feedDatasDtos: SortedFeedItemResponseDto =
        await sortedFeedDatasResponse.json();

      console.log("feedDatasDtos", feedDatasDtos);

      return feedDatasDtos;
    }

    // 서버 사이드 (빌드 타임 포함): 직접 repository 호출
    // 빌드 타임에는 서버가 없으므로 fetch 대신 직접 호출
    const feedDatas = await feedRepository.getMainFeed(page);

    const sortedFeedDatas = feedService.createSortedItems(
      feedDatas.items,
      initial
    );

    const responseDto: SortedFeedItemResponseDto = {
      items: sortedFeedDatas,
      pagination: feedDatas.pagination,
    };

    return responseDto;
  } catch (error) {
    console.error("[queryFeedList] Error:", error);
    throw error;
  }
};
