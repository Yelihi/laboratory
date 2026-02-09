import type { ReviewsResponseDto } from "@/entities/review/models/dtos";
import type { ReviewSectionProps } from "@/views/main/models/interface";

export const convertReviewSection = (
  reviewsDto: ReviewsResponseDto
): ReviewSectionProps => {
  return {
    titles: reviewsDto.title.map((title) => ({
      text: title.text,
      fontSize: title.size,
      fontColor: title.color,
      backgroundColor: title.bgColor,
      type: title.types[0] as "BOLD" | "REGULAR",
    })),
    items: reviewsDto.products.map((product) => ({
      uuid: product.uuid,
      image: product.image,
      productName: product.productName,
      artistName: product.artistName,
      saleRate: product.saleRate,
      price: product.price,
      reviewInfo: product.reviewInfo,
      reviewRate: product.reviewRate,
      reviewCount: product.reviewCount,
    })),
  };
};
