import type { GiftsResponseDto } from "@/entities/gift/models/dtos";

import { convertGiftSection } from "@/views/main/models/converter/convertGiftSection";

export const queryGiftList = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gift`);

    const gifts: GiftsResponseDto = await response.json();

    // gift section 전환
    const convertedGiftSection = convertGiftSection(gifts);

    return convertedGiftSection;
  } catch (error) {
    console.error("[queryGiftList] Error:", error);
    throw error;
  }
};
