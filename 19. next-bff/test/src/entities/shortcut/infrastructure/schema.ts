import { z } from "zod";

const ShortcutItemSchema = z.object({
  id: z.number().int(),
  imageUrl: z.string(),
  label: z.string(),
  webUrl: z.string(),
});

export const ShortcutsResponseDtoSchema = z.object({
  title: z.string(),
  items: z.array(ShortcutItemSchema),
});
