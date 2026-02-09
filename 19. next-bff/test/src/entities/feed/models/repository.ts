import { SortedFeedItemResponseDto } from "@/entities/feed/services/interface";
import { MainFeedResponseDto } from "@/entities/feed/models/dtos";

export interface FeedRepository {
  getMainFeed: (page: number) => Promise<MainFeedResponseDto>;
}
