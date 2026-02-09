import type { ReviewRepository } from "@/entities/review/models/repository";
import { ReviewsResponseDto } from "@/entities/review/models/dtos";

export class ReviewRepositoryImpl implements ReviewRepository {
  /**
   * @description (server-only) reviews 조회
   * @returns {Promise<ReviewsResponseDto>}
   */
  public getReviews = async (): Promise<ReviewsResponseDto> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/server/unit-review.json`
    );
    const reviewsResponse: ReviewsResponseDto = await response.json();

    return reviewsResponse;
  };
}

/**
 * 싱글톤 인스턴스 생성 및 export
 */
const reviewRepository = Object.freeze(new ReviewRepositoryImpl());

export { reviewRepository };
