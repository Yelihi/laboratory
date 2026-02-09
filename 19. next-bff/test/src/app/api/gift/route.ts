import { NextResponse } from "next/server";

// entities
import { giftRepository } from "@/entities/gift/infrastructure/repositoryImpl";

export async function GET(request: Request) {
  try {
    // 데이터 패칭
    const giftDatas = await giftRepository.getGifts();

    // 응답 전달
    return NextResponse.json(giftDatas);
  } catch (error) {
    console.error("[GET /api/gift]", error);
    return NextResponse.json(
      {
        error: "데이터 요청에 실패하였습니다.",
      },
      { status: 500 }
    );
  }
}
