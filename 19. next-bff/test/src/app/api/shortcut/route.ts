import { NextResponse } from "next/server";

// entities
import { shortcutRepository } from "@/entities/shortcut/infrastructure/repositoryimpl";

export async function GET(request: Request) {
  try {
    // 데이터 패칭
    const shortcutDatas = await shortcutRepository.getShortcuts();

    // 응답 전달
    return NextResponse.json(shortcutDatas);
  } catch (error) {
    console.error("[GET /api/shortcut]", error);
    return NextResponse.json(
      {
        error: "데이터 요청에 실패하였습니다.",
      },
      { status: 500 }
    );
  }
}
