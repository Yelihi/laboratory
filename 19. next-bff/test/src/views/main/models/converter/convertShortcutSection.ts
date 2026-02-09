import type { ShortcutsResponseDto } from "@/entities/shortcut/models/dtos";
import type { ShortcutSectionProps } from "@/views/main/models/interface";

export const convertShortcutSection = (
  shortcuts: ShortcutsResponseDto
): ShortcutSectionProps => {
  return {
    title: shortcuts.title,
    items: shortcuts.items.map((item) => ({
      id: item.id,
      imageUrl: item.imageUrl,
      label: item.label,
      webUrl: item.webUrl,
    })),
  };
};
