import { NextResponse } from "next/server";

// entities
import { reviewRepository } from "@/entities/review/infrastructure/repositoryimpl";

export async function GET(request: Request) {
  try {
    // 데이터 패칭
    const reviewDatas = await reviewRepository.getReviews();

    // 응답 전달
    return NextResponse.json(reviewDatas);
  } catch (error) {
    console.error("[GET /api/review]", error);
    return NextResponse.json(
      {
        error: "데이터 요청에 실패하였습니다.",
      },
      { status: 500 }
    );
  }
}
