"use client";

import { use } from "react";
import { queryGiftList } from "@/views/main/services/queryGiftList";

import { UnitSection } from "@/views/main/ui/components/UnitSection";
import { GiftSection } from "@/views/main/ui/components/gift/GiftSection";

// 모듈 레벨에서 Promise 생성 (한 번만 생성됨)
const giftPromise = queryGiftList();

export const WrapperGiftSection = () => {
  const giftSection = use(giftPromise);

  if (!giftSection) {
    return <div>Error</div>;
  }

  return (
    <UnitSection backgroundColor={"#F8F8F0"}>
      <GiftSection {...giftSection} />
    </UnitSection>
  );
};
