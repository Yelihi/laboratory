"use client";
import { use } from "react";

import { queryReviewList } from "@/views/main/services/queryReviewList";

import { UnitSection } from "@/views/main/ui/components/UnitSection";
import { ReviewSection } from "@/views/main/ui/components/review/ReviewSection";

// 모듈 레벨에서 Promise 생성 (한 번만 생성됨)
const reviewPromise = queryReviewList();

export const WrapperReviewSection = () => {
  const convertedReviews = use(reviewPromise);

  if (!convertedReviews) {
    return <div>Error</div>;
  }

  return (
    <UnitSection backgroundColor={"#F0F4F8"}>
      <ReviewSection {...convertedReviews} />
    </UnitSection>
  );
};
