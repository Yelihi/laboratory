export interface ShortcutItem {
  id: number;
  imageUrl: string;
  label: string;
  webUrl: string;
}

/** response dto */

export interface ShortcutsResponseDto {
  title: string;
  items: ShortcutItem[];
}
