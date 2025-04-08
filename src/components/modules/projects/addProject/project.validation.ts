import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  thumbnail: z.string().url("Invalid URL format"),
  description: z.string().min(10, "Description should be more detailed"),
  projectRole: z.string().min(3, "Enter a valid role"),
  technologiesUsed: z.array(z.string()).min(1, "Select at least one technology"),
  keyFeatures: z.array(z.string()).min(1, "Enter at least one key feature"),
  liveLink: z.string().url("Invalid URL format"),
  frontendSourceCode: z.string().optional(),
  backendSourceCode: z.string().optional(),
  apiDocumentation: z.string().optional(),
  isFeatured: z.boolean(),
});
