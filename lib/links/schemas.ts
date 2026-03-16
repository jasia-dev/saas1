import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .max(1000, "Keep this field under 1000 characters.")
  .optional()
  .transform((value) => (value ? value : null));

export const linkSchema = z.object({
  url: z.url("Enter a valid URL.").max(2048, "URL is too long."),
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(200, "Keep the title under 200 characters."),
  description: optionalText,
  notes: optionalText,
});

export const linkUpdateSchema = linkSchema.extend({
  id: z.uuid("Invalid link id."),
});

export const linkDeleteSchema = z.object({
  id: z.uuid("Invalid link id."),
});

export type LinkInput = z.infer<typeof linkSchema>;
export type LinkUpdateInput = z.infer<typeof linkUpdateSchema>;
