import type { FeedRepository } from "@/entities/feed/models/repository";
import { MainFeedResponseDto } from "@/entities/feed/models/dtos";

export class FeedRepositoryImpl implements FeedRepository {
  /**
   * @description (server-only) main feed 를 조회하되, 정책에 따라 정렬된 형태로 return
   * @param {number} page pagination
   * @returns {Promise<SortedFeedItemResponseDto>}
   */
  public getMainFeed = async (page: number): Promise<MainFeedResponseDto> => {
    // todo: 실제 서버로부터 데이터 호출

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/server/page${page}.json`
    );

    const feedItemsResponse: MainFeedResponseDto = await response.json();

    return feedItemsResponse;
  };
}

/**
 * 싱글톤 인스턴스 생성 및 export
 */
const feedRepository = Object.freeze(new FeedRepositoryImpl());

export { feedRepository };
