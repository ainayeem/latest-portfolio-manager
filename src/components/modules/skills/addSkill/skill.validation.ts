import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(3, "Skill must be at least 3 characters long").max(25, "Skill must be no longer than 25 characters"),
  icon: z.string().url("Invalid URL format"),
  description: z.string().optional(),
  category: z.string(),
});
