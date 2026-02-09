import { GiftsResponseDto } from "@/entities/gift/models/dtos";

export interface GiftRepository {
  /** 추후 페이지내이션이 필요하다면 parameter 추가 */
  getGifts: () => Promise<GiftsResponseDto>;
}
