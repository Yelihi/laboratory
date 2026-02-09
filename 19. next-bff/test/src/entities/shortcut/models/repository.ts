import { ShortcutsResponseDto } from "@/entities/shortcut/models/dtos";

export interface ShortcutRepository {
  /** 추후 페이지내이션이 필요하다면 parameter 추가 */
  getShortcuts: () => Promise<ShortcutsResponseDto>;
}
