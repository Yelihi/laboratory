import type { ReviewsResponseDto } from "@/entities/review/models/dtos";
import { convertReviewSection } from "@/views/main/models/converter/convertReviewSection";

export const queryReviewList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/review`
    );

    const reviews: ReviewsResponseDto = await response.json();

    // review section 전환
    const convertedReviewSection = convertReviewSection(reviews);

    return convertedReviewSection;
  } catch (error) {
    console.error("[queryReviewList] Error:", error);
    throw error;
  }
};
