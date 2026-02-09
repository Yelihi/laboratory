"use client";
import { use } from "react";
import { queryShortcutList } from "@/views/main/services/queryShortcutList";

import { ShortcutSection } from "@/views/main/ui/components/shortcut/ShortcutSection";
import { UnitSection } from "@/views/main/ui/components/UnitSection";

// 모듈 레벨에서 Promise 생성 (한 번만 생성됨)
const shortcutPromise = queryShortcutList();

export const WrapperShortcutSection = () => {
  const convertedShortcutSection = use(shortcutPromise);

  if (!convertedShortcutSection) {
    return <div>Error</div>;
  }

  return (
    <UnitSection backgroundColor={"#FFFFFF"} isMargin={30}>
      <ShortcutSection {...convertedShortcutSection} />
    </UnitSection>
  );
};
