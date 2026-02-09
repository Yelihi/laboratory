import { NextResponse } from "next/server";

// entities
import { SortedFeedItemResponseDto } from "@/entities/feed/services/interface";
import { feedRepository } from "@/entities/feed/infrastructure/repositoryImpl";
import { feedService } from "@/entities/feed/services/FeedService";

/**
 * Feed API Route (server-only)
 * GET /api/feed?page=1
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const initial = searchParams.get("initial") === "true";

    // 서버에서 조회된 feed datas
    const feedDatas = await feedRepository.getMainFeed(Number(page));

    // 정책에 따라 정렬된 feed datas
    const sortedFeedDatas = feedService.createSortedItems(
      feedDatas.items,
      initial
    );

    const responseDto: SortedFeedItemResponseDto = {
      items: sortedFeedDatas,
      pagination: feedDatas.pagination,
    };

    return NextResponse.json(responseDto);
  } catch (error) {
    // todo: NextResponse 내 error 에 대한 클라이언트 에러 처리 추가
    console.error("에러 발생", error);
    return NextResponse.json(
      { error: "데이터 요청에 실패하였습니다." },
      { status: 500 }
    );
  }
}
