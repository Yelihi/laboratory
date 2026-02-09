import { ReviewsResponseDto } from "@/entities/review/models/dtos";

export interface ReviewRepository {
  getReviews: () => Promise<ReviewsResponseDto>;
}
