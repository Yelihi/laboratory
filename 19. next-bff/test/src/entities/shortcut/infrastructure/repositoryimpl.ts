import type { ShortcutRepository } from "@/entities/shortcut/models/repository";
import { ShortcutsResponseDto } from "@/entities/shortcut/models/dtos";

export class ShortcutRepositoryImpl implements ShortcutRepository {
  /**
   * @description (server-only) shortcuts 조회
   * @returns {Promise<ShortcutsResponseDto>}
   */
  public getShortcuts = async (): Promise<ShortcutsResponseDto> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/server/unit-shortcut.json`
    );
    const shortcutsResponse: ShortcutsResponseDto = await response.json();

    return shortcutsResponse;
  };
}

/**
 * 싱글톤 인스턴스 생성 및 export
 */
const shortcutRepository = Object.freeze(new ShortcutRepositoryImpl());

export { shortcutRepository };
