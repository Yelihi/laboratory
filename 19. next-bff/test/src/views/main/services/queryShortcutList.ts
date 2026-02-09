import type { ShortcutsResponseDto } from "@/entities/shortcut/models/dtos";

import { convertShortcutSection } from "@/views/main/models/converter/convertShortcutSection";

export const queryShortcutList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/shortcut`
    );

    const shortcuts: ShortcutsResponseDto = await response.json();

    // shortcut section 전환
    const convertedShortcutSection = convertShortcutSection(shortcuts);

    return convertedShortcutSection;
  } catch (error) {
    console.error("[queryShortcutList] Error:", error);
    throw error;
  }
};
