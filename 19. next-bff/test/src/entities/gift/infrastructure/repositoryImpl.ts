import type { GiftRepository } from "@/entities/gift/models/repository";
import { GiftsResponseDto } from "@/entities/gift/models/dtos";

export class GiftRepositoryImpl implements GiftRepository {
  /**
   * @description (server-only) gifts 조회
   * @returns {Promise<GiftsResponseDto>}
   */
  public getGifts = async (): Promise<GiftsResponseDto> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/server/unit-gift.json`
    );
    const giftsResponse: GiftsResponseDto = await response.json();

    return giftsResponse;
  };
}

/**
 * 싱글톤 인스턴스 생성 및 export
 */
const giftRepository = Object.freeze(new GiftRepositoryImpl());

export { giftRepository };
